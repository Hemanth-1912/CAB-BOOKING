import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingAPI } from '../services/api'
import '../styles/book-ride.css'

function BookRide() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    rideType: 'economy',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const bookingData = {
        pickupLocation: {
          address: formData.pickupLocation,
          coordinates: {
            type: 'Point',
            coordinates: [77.2245, 28.5355], // Default coords, in real app use GPS
          },
        },
        dropoffLocation: {
          address: formData.dropoffLocation,
          coordinates: {
            type: 'Point',
            coordinates: [77.2345, 28.5455],
          },
        },
        rideType: formData.rideType,
      }

      await bookingAPI.requestRide(bookingData)
      alert('🚕 Ride requested! Waiting for driver acceptance...')
      navigate('/ride-history')
    } catch (err) {
      const status = err.response?.status
      if (status === 401) {
        setError('You are not logged in. Please login first.')
      } else if (status === 400) {
        setError(err.response?.data?.message || 'Invalid booking details.')
      } else if (!err.response) {
        setError('Cannot connect to server. Make sure the backend is running.')
      } else {
        setError(err.response?.data?.message || 'Failed to book ride. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getFareEstimate = () => {
    const { pickupLocation, dropoffLocation, rideType } = formData
    if (!pickupLocation || !dropoffLocation) return null

    const totalLen = pickupLocation.length + dropoffLocation.length
    const distance = parseFloat((3 + (totalLen % 12) + (totalLen % 5) / 2).toFixed(1))
    
    const rates = { economy: 10, premium: 15, shared: 7 }
    const rate = rates[rideType] || 10
    const base = 50
    const fare = Math.round(base + distance * rate)

    return { distance, fare }
  }

  const estimate = getFareEstimate()

  return (
    <div className="book-ride">
      <div className="container">
        <h1>📍 Book a Ride</h1>

        <div className="booking-card">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>📍 Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter pickup address"
                required
              />
            </div>

            <div className="form-group">
              <label>📍 Dropoff Location</label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                placeholder="Enter destination address"
                required
              />
            </div>

            <div className="form-group">
              <label>🚗 Ride Type</label>
              <select
                name="rideType"
                value={formData.rideType}
                onChange={handleChange}
              >
                <option value="economy">Economy - ₹10/km</option>
                <option value="premium">Premium - ₹15/km</option>
                <option value="shared">Shared - ₹7/km</option>
              </select>
            </div>

            {estimate && (
              <div className="fare-estimate-box" style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px', color: '#4a5568' }}>📊 Fare & Distance Estimate</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                  <span>Estimated Distance:</span>
                  <strong>{estimate.distance} km</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#2d3748' }}>
                  <span>Estimated Fare:</span>
                  <strong style={{ fontSize: '18px', color: '#2b6cb0' }}>₹{estimate.fare}</strong>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Request Ride'}
            </button>
          </form>

          <div className="ride-info">
            <h3>💡 Ride Information</h3>
            <ul>
              <li>✅ Choose pickup and dropoff locations</li>
              <li>✅ Select your preferred ride type</li>
              <li>✅ A driver will accept your ride shortly</li>
              <li>✅ Track your ride in real-time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookRide
