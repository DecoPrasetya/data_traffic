import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const FormEditUsers = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [role, setRole] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`)
                setUsername(response.data.username)
                setEmail(response.data.email)
                setRole(response.data.role)
            } catch (error) {
                if (error.response) return setMsg(error.response.data.msg)
            }
        }
        getUser()
    }, [id])

    const updateUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/users', ({
                username: username,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role
            }))
            navigate('/users')
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg)
        }
    }

    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>Update Users</h2>
            <div className="card is-shadowless is-fullwidth">
                <div className="card-content">
                    <div className="content">
                        <div className="column is-4">
                            <p className='has-text-centered'>{msg}</p>
                            <form onSubmit={updateUser}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Confrim Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='******' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Role</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                                <option value="">--Role--</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-success" type='submit'>Save</button>
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

export default FormEditUsers