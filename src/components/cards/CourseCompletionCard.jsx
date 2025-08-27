import React from 'react'
import { ChevronDown } from 'lucide-react'
import './CourseCompletionCard.css'

const CourseCompletionCard = () => {
  const courses = [
    {
      name: 'Fork Lift Training',
      completed: 'Not Completed',
      compliant: '0/0',
      note: '(Face to Face)'
    },
    {
      name: 'UK GDPR',
      completed: 'Not Completed',
      compliant: '0/2',
      dueDate: 'Mar 17, 2025'
    },
    {
      name: 'Health & Safety',
      completed: 'Not Completed',
      compliant: '',
      note: ''
    }
  ]

  return (
    <div className="card course-completion-card">
      <div className="card-header">
        <h3>Course Completion</h3>
      </div>
      <div className="card-content">
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-info">
                <h4 className="course-name">{course.name}</h4>
                <p className="course-status">Completed: {course.completed}</p>
                {course.compliant && (
                  <p className="course-compliant">Compliant: {course.compliant}</p>
                )}
                {course.dueDate && (
                  <p className="course-due">Due Date: {course.dueDate}</p>
                )}
                {course.note && (
                  <p className="course-note">{course.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  )
}

export default CourseCompletionCard
