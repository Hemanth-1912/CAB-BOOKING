import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import { supportAPI } from '../services/api'
import '../styles/dashboard.css'

function Dashboard() {
  const { user, getProfile } = useAuthStore()
  const [loading, setLoading] = useState(false)
  
  // Support states
  const [tickets, setTickets] = useState([])
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [ticketLoading, setTicketLoading] = useState(false)

  const fetchTickets = async () => {
    try {
      const response = await supportAPI.getUserTickets()
      setTickets(response.data.tickets || [])
    } catch (err) {
      console.error('Failed to fetch support tickets:', err)
    }
  }

  useEffect(() => {
    setLoading(true)
    getProfile()
    fetchTickets()
    setLoading(false)
  }, [])

  const handleRaiseTicket = async (e) => {
    e.preventDefault()
    if (!subject || !description) return

    setTicketLoading(true)
    try {
      await supportAPI.createTicket({ subject, description })
      setSubject('')
      setDescription('')
      alert('Support ticket raised successfully!')
      fetchTickets()
    } catch (err) {
      alert('Failed to raise support ticket.')
    } finally {
      setTicketLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="card profile-card">
            <h2>👤 Your Profile</h2>
            {user ? (
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>

          <div className="card quick-actions">
            <h2>🚀 Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/book-ride" className="action-btn">
                📍 Book a Ride
              </Link>
              <Link to="/ride-history" className="action-btn">
                📋 Ride History
              </Link>
              {user?.role === 'driver' ? (
                <Link to="/driver-dashboard" className="action-btn" style={{ background: '#e0e7ff', color: '#3730a3', fontWeight: 'bold' }}>
                  🚕 Driver Panel
                </Link>
              ) : (
                <Link to="/driver-register" className="action-btn">
                  🚕 Become a Driver
                </Link>
              )}
            </div>
          </div>

          <div className="card stats">
            <h2>📊 Your Stats</h2>
            <div className="stat-item">
              <span className="stat-label">Total Rides:</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Spent:</span>
              <span className="stat-value">₹0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rating:</span>
              <span className="stat-value">⭐ N/A</span>
            </div>
          </div>
        </div>

        {/* Customer Support Panel */}
        <div className="support-section" style={{ marginTop: '30px' }}>
          <div className="card support-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '20px', color: '#4a5568', marginTop: '0', marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
              🛠️ Help & Support System
            </h2>
            <div className="support-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* Form card */}
              <div>
                <h3 style={{ fontSize: '16px', color: '#2d3748', margin: '0 0 16px' }}>Raise a Support Issue</h3>
                <form onSubmit={handleRaiseTicket}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>Subject</label>
                    <input 
                      type="text" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      placeholder="e.g. Lost item, Payment issue"
                      required
                      style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e0', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>Description</label>
                    <textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Describe your concern in detail..."
                      required
                      rows="3"
                      style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e0', borderRadius: '8px', boxSizing: 'border-box', resize: 'none' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '600' }} disabled={ticketLoading}>
                    {ticketLoading ? 'Submitting...' : 'Submit Support Request'}
                  </button>
                </form>
              </div>

              {/* Tickets List */}
              <div>
                <h3 style={{ fontSize: '16px', color: '#2d3748', margin: '0 0 16px' }}>Your Active Tickets ({tickets.length})</h3>
                <div className="support-tickets-container" style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #edf2f7', borderRadius: '12px', padding: '12px', background: '#f8fafc' }}>
                  {tickets.length === 0 ? (
                    <p style={{ color: '#718096', textAlign: 'center', margin: '40px 0', fontSize: '14px' }}>No support requests filed.</p>
                  ) : (
                    tickets.map(ticket => (
                      <div key={ticket._id} style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#2d3748' }}>{ticket.subject}</strong>
                          <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: ticket.status === 'open' ? '#dd6b20' : '#38a169', background: ticket.status === 'open' ? '#feebc8' : '#c6f6d5', padding: '2px 6px', borderRadius: '4px' }}>
                            {ticket.status}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#4a5568', lineHeight: '1.4' }}>{ticket.description}</p>
                        <div style={{ fontSize: '10px', color: '#a0aec0' }}>Raised: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
