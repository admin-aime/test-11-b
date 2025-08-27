import React from 'react'
import './MyCoursesCard.css'

const MyCoursesCard = () => {
  return (
    <div className="card my-courses-card">
      <div className="card-header">
        <h3>My Courses</h3>
      </div>
      <div className="card-content">
        <div className="progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#9e9e9e"
              strokeWidth="8"
              strokeDasharray="314"
              strokeDashoffset="314"
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percentage">0%</span>
            <span className="progress-label">Completed</span>
            <span className="progress-status">Indeterminate</span>
          </div>
        </div>
        <button className="view-courses-btn">View Courses</button>
      </div>
    </div>
  )
}

export default MyCoursesCard
