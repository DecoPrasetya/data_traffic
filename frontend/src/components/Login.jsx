import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/authSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispacth = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccsess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user || isSuccsess) {
            navigate('/dashboard')
        }
        dispacth(reset)
    }, [user, isSuccsess, dispacth, navigate])

    const Auth = (e) => {
        e.preventDefault()
        dispacth(login({ email, password }))
    }


    return (
        <div>
            <section className="hero is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4">
                                <form className="box" onSubmit={Auth}>
                                    {isError && <p className="has-text-centered">
                                        {message}
                                    </p>}
                                    <h1 className='title is-2 is-centered'>Sign In</h1>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input type="password" className="input" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth" type='sumbit'>{isLoading ? 'Loading' : 'Login'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login