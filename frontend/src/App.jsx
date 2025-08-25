import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'
import Header from './components/Header'

// pages
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Header />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={<Dashboard />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
