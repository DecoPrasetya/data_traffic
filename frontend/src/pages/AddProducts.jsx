import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAddProducts from '../components/FormAddProoducts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'


const AddProducts = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate()
  const { isError } = useSelector((state) => state.auth)

  useEffect(() => {
    dispacth(getMe())
  }, [dispacth])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
  }, [isError, navigate])

  return (
    <Layout>
      <FormAddProducts />
    </Layout>
  )
}

export default AddProducts