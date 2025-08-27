import React from 'react'
import { Calendar, Clock } from 'lucide-react'
import './MyInvitesCard.css'

const MyInvitesCard = () => {
  return (
    <div className="card my-invites-card">
      <div className="card-header">
        <h3>My Invites</h3>
      </div>
      <div className="card-content">
        <div className="empty-state">
          <div className="calendar-icon">
            <Calendar size={32} color="#ff4444" />
            <Clock size={16} className="clock-overlay" />
          </div>
          <p className="empty-message">You have no invites.</p>
        </div>
      </div>
    </div>
  )
}

export default MyInvitesCard
