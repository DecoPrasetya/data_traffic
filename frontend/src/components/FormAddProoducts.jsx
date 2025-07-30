import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const FormAddProducts = () => {
    const [name, setName] = useState('')
    const [qty, setQty] = useState()
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const createProduct = async (e) => {
        e.preventDefault()
        try {
            const numQty = Number(qty)
            await axios.post('http://localhost:5000/products', ({
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
            <h2 className='subtitle'>Add New Products</h2>
            <div className="card is-shadowless is-fullwidth">
                <div className="card-content">
                    <div className="content">
                        <div className="column is-4">
                            <form onSubmit={createProduct}>
                                <p className='has-text-centered'>{msg}</p>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder='Name' required/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Quantity</label>
                                    <div className="control">
                                        <input value={qty} onChange={(e) => setQty(e.target.value)} type="number" className="input" placeholder='Quantity' required/>
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

export default FormAddProducts