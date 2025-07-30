import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const FormEditProducts = () => {
    const [name, setName] = useState('')
    const [qty, setQty] = useState()
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`)
                setName(response.data.name)
                setQty(response.data.qty)
            }
            catch (error) {
                if (error.response) return setMsg(error.response.data.msg)
            }
        }
        getProduct()
    }, [id])

    const updateProduct = async (e) => {
        e.preventDefault()
        try {
            const numQty = Number(qty)
            await axios.patch(`http://localhost:5000/products/${id}`, ({
                name: name,
                qty: numQty
            }))
            navigate('/products')
        } catch (error) {
            if (error.response) return setMsg(error.response.data.msg)
        }

    }



    return (
        <div>
            <h1 className='title'>Products</h1>
            <h2 className='subtitle'>Edit Products</h2>
            <div className="card is-shadowless is-fullwidth">
                <div className="card-content">
                    <div className="content">
                        <div className="column is-4">
                            <form onSubmit={updateProduct}>
                                <p className='has-text-centered'>{msg}</p>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder='Name' required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Quantity</label>
                                    <div className="control">
                                        <input value={qty} onChange={(e) => setQty(e.target.value)} type="number" className="input" placeholder='Quantity' required />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button type='sumbit' className="button is-success">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditProducts