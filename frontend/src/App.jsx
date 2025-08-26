import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'
import Header from './components/Header'

// pages
import Dashboard from './pages/Dashboard'
import Meeting from './pages/Meeting'

// context
import { TodoContextProvider } from './context/TodoContext'
import { MeetingContextProvider } from './context/MeetingContext.jsx'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={
                <>
                  <Header path="To-do"/>
                  <TodoContextProvider>
                    <Dashboard />
                  </TodoContextProvider>
                </>
              }
            />
            <Route 
              path='/meeting'
              element={
                <>
                  <Header path="Meetings"/>
                  <MeetingContextProvider>
                    <Meeting />
                  </MeetingContextProvider>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
