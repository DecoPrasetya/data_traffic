import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data)
    }

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`)
        getProduct()
    }

    return (
        <div>
            <h1 className='title'>Products</h1>
            <h2 className='subtitle'>List of Products</h2>
            <Link className='button is-primary mb-2' to={'/products/add'}>Add Product</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Created by</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.uuid}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.qty}</td>
                            <td>{product.user.username}</td>
                            <td>
                                <Link to={`/products/edit/${product.uuid}`} className='button is-small is-info'>Edit</Link>
                                <button onClick={() => deleteProduct(product.uuid)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList