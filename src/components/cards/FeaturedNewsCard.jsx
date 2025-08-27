import React from 'react'
import './FeaturedNewsCard.css'

const FeaturedNewsCard = () => {
  return (
    <div className="card featured-news-card">
      <div className="card-header">
        <h3>Featured News</h3>
      </div>
      <div className="card-content">
        <div className="news-image">
          <div className="breaking-news-badge">
            BREAKING NEWS
          </div>
          <div className="news-people">
            <div className="person person-1"></div>
            <div className="person person-2"></div>
          </div>
        </div>
        <div className="news-text">
          <p>No news is good news, right?</p>
        </div>
        <button className="manage-news-btn">Manage News</button>
      </div>
    </div>
  )
}

export default FeaturedNewsCard
