import React from 'react'
import { Calendar, Clock } from 'lucide-react'
import './UpcomingEventsCard.css'

const UpcomingEventsCard = () => {
  return (
    <div className="card upcoming-events-card">
      <div className="card-header">
        <h3>Upcoming Events</h3>
      </div>
      <div className="card-content">
        <div className="empty-state">
          <div className="calendar-icon">
            <Calendar size={32} color="#ff4444" />
            <Clock size={16} className="clock-overlay" />
          </div>
          <p className="empty-message">You have no upcoming events.</p>
        </div>
        <button className="view-events-btn">View Events</button>
      </div>
    </div>
  )
}

export default UpcomingEventsCard
