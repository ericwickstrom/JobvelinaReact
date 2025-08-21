import { useState, useEffect } from 'react'
import JobApplicationForm from './components/JobApplicationForm'
import JobApplicationsTable from './components/JobApplicationsTable'
import { JobApplicationsController } from './services/jobApplicationsController'
import type { JobApplication } from './types/jobApplication'
import './App.css'

function App() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setJobApplications(JobApplicationsController.getAllJobApplications());
  }, []);

  const handleNewApplication = () => {
    // Refresh the list from the controller instead of manually adding
    // This prevents duplicates since the controller already added it
    setJobApplications(JobApplicationsController.getAllJobApplications());
  };

  const handleUpdateApplication = (updatedApplication: JobApplication) => {
    setJobApplications(prev => 
      prev.map(app => 
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobvelina</h1>
          <p className="text-lg text-gray-600">Track and manage your job applications</p>
        </div>
        
        <div className="space-y-8">
          {isFormVisible && (
            <JobApplicationForm 
              onApplicationAdded={handleNewApplication} 
              onClose={() => setIsFormVisible(false)}
            />
          )}
          
          <div className="relative">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg shadow-lg transition-all duration-200 ${
                  isFormVisible
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                title={isFormVisible ? 'Hide form' : 'Show form'}
              >
                {isFormVisible ? '−' : '+'}
              </button>
            </div>
            <JobApplicationsTable jobApplications={jobApplications} onUpdate={handleUpdateApplication} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App