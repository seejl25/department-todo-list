import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'
import Header from './components/Header'

// pages
import Dashboard from './pages/Dashboard'
import Meeting from './pages/Meeting'
import Announcement from './pages/Announcement.jsx'

// context
import { TodoContextProvider } from './context/TodoContext'
import { MeetingContextProvider } from './context/MeetingContext.jsx'
import { AnnouncementContextProvider } from './context/AnnouncementContext.jsx'

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
            <Route 
              path='/announcement'
              element={
                <>
                  <Header path="Announcements" />
                  <AnnouncementContextProvider>
                    <Announcement />
                  </AnnouncementContextProvider>
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
