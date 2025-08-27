import React from 'react'
import MyCoursesCard from './cards/MyCoursesCard'
import CourseCompletionCard from './cards/CourseCompletionCard'
import MyInvitesCard from './cards/MyInvitesCard'
import FeaturedNewsCard from './cards/FeaturedNewsCard'
import UpcomingEventsCard from './cards/UpcomingEventsCard'
import EventsCalendarCard from './cards/EventsCalendarCard'
import './DashboardGrid.css'

const DashboardGrid = () => {
  return (
    <div className="dashboard-grid">
      <div className="grid-row">
        <MyCoursesCard />
        <CourseCompletionCard />
        <MyInvitesCard />
        <FeaturedNewsCard />
      </div>
      <div className="grid-row">
        <UpcomingEventsCard />
        <EventsCalendarCard />
      </div>
    </div>
  )
}

export default DashboardGrid
