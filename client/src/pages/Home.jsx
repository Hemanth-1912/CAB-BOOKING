import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import '../styles/home.css'

function Home() {
  const { token } = useAuthStore()

  return (
    <div className="home">
      <div className="hero-section">
        <h1>🚕 Welcome to Cab-U</h1>
        <p>Your trusted ride booking platform</p>

        <div className="hero-buttons">
          {token ? (
            <>
              <Link to="/book-ride" className="btn btn-primary">
                Book a Ride
              </Link>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features">
        <h2>Why Choose Cab-U?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Safe & Secure</h3>
            <p>Your safety is our priority with verified drivers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Affordable Prices</h3>
            <p>Transparent pricing with no hidden charges</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Pickup</h3>
            <p>Get a ride in minutes with real-time tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Rated Drivers</h3>
            <p>All drivers are rated and reviewed by passengers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
