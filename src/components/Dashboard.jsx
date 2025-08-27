import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardGrid from './DashboardGrid'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="container">
        <DashboardGrid />
      </div>
    </div>
  )
}

export default Dashboard
