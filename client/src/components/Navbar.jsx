import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import '../styles/navbar.css'

function Navbar() {
  const { token, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚕 Cab-U
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {user?.role === 'driver' ? (
                <li>
                  <Link to="/driver-dashboard" style={{ color: '#007bff', fontWeight: 'bold' }}>🚕 Driver Panel</Link>
                </li>
              ) : (
                <li>
                  <Link to="/driver-register">Become Driver</Link>
                </li>
              )}
              <li>
                <Link to="/book-ride">Book Ride</Link>
              </li>
              <li>
                <Link to="/ride-history">History</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn-register">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
