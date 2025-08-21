import React, { useState, useEffect } from 'react'
import JobApplicationForm from './components/JobApplicationForm'
import JobApplicationsTable from './components/JobApplicationsTable'
import { JobApplicationsController } from './services/jobApplicationsController'
import type { JobApplication } from './types/jobApplication'
import './App.css'

function App() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    setJobApplications(JobApplicationsController.getAllJobApplications());
  }, []);

  const handleNewApplication = (newApplication: JobApplication) => {
    setJobApplications(prev => [...prev, newApplication]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🐗 Jobvelina 🐗</h1>
          <p className="text-lg text-gray-600">Track and manage your job applications</p>
        </div>
        
        <div className="space-y-8">
          <JobApplicationForm onApplicationAdded={handleNewApplication} />
          <JobApplicationsTable jobApplications={jobApplications} />
        </div>
      </div>
    </div>
  )
}

export default App