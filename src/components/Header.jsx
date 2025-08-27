import React from 'react'
import { Search, Bell, MessageSquare, User } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <div className="logo-circles">
                <div className="circle circle-blue"></div>
                <div className="circle circle-green"></div>
                <div className="circle circle-red"></div>
                <div className="circle circle-yellow"></div>
              </div>
            </div>
            <span className="logo-text">myAko</span>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <button className="nav-btn nav-btn-dashboard">
              Dashboard <span className="nav-arrow">▼</span>
            </button>
            <button className="nav-btn nav-btn-site">
              Site Management <span className="nav-arrow">▼</span>
            </button>
            <button className="nav-btn nav-btn-course">
              Course <span className="nav-arrow">▼</span>
            </button>
            <button className="nav-btn nav-btn-features">
              Features <span className="nav-arrow">▼</span>
            </button>
          </nav>

          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
          </div>

          {/* Right Section */}
          <div className="header-right">
            <div className="user-badge">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span className="user-text">myAko</span>
              <span className="user-arrow">▼</span>
            </div>
            <button className="icon-btn">
              <MessageSquare size={20} />
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={20} />
            </button>
            <div className="settings-icon">
              <div className="settings-grid">
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
                <div className="settings-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
