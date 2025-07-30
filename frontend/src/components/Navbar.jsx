import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/authSlice'

const Navbar = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const Logout = () => {
    dispacth(logout())
    dispacth(reset())
    navigate('/')
  }


  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to='/dashboard' className="navbar-item">
            <img src="#" width="112" height="28" alt='logo' />
          </NavLink>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-light" onClick={Logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar