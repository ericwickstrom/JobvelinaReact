import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="block">
          <img src={viteLogo} className="w-24 h-24 hover:animate-spin" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="block">
          <img src={reactLogo} className="w-24 h-24 hover:animate-spin" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Vite + React</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600">
          Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App