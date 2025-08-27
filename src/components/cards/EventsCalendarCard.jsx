import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './EventsCalendarCard.css'

const EventsCalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)) // July 2025

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="card events-calendar-card">
      <div className="card-header">
        <h3>Events Calendar</h3>
      </div>
      <div className="card-content">
        <div className="calendar-header">
          <div className="month-navigation">
            <span className="month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <div className="nav-buttons">
              <button className="today-btn">today</button>
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(-1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-days-header">
            {dayNames.map(day => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>
          
          <div className="calendar-days">
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day ? 'has-day' : 'empty-day'} ${day === 10 ? 'has-event' : ''}`}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    {day === 10 && (
                      <div className="event-indicator">
                        <div className="event-dot"></div>
                        <span className="event-text">11:00 AM Record Media</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsCalendarCard
