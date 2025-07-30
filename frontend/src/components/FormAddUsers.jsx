import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const FormAddUsers = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [role, setRole] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()


    const createUser = async (e) => {
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
            <h2 className='subtitle'>Add New Users</h2>
            <div className="card is-shadowless is-fullwidth">
                <div className="card-content">
                    <div className="content">
                        <div className="column is-4">
                            <p className='has-text-centered'>{msg}</p>
                            <form onSubmit={createUser}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Confrim Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='******' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
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

export default FormAddUsers