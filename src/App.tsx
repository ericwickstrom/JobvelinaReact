import JobApplicationsTable from './components/JobApplicationsTable'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🐗 Jobvelina 🐗</h1>
          <p className="text-lg text-gray-600">Track and manage your job applications</p>
        </div>
        
        <JobApplicationsTable />
      </div>
    </div>
  )
}

export default App