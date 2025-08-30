import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.jsx'

// components
import Navbar from './components/Navbar'
import Header from './components/Header'

// pages
import Dashboard from './pages/Dashboard'
import Meeting from './pages/Meeting'
import Announcement from './pages/Announcement.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

// context
import { TodoContextProvider } from './context/TodoContext'
import { MeetingContextProvider } from './context/MeetingContext.jsx'
import { AnnouncementContextProvider } from './context/AnnouncementContext.jsx'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route 
                path='/'
                element={ user ?
                  <>
                    <Header path="To-do"/>
                    <TodoContextProvider>
                      <Dashboard />
                    </TodoContextProvider>
                  </> :
                  <Navigate to="/login" />
                }
              />
              <Route 
                path='/meeting'
                element={ user ?
                  <>
                    <Header path="Meetings"/>
                    <MeetingContextProvider>
                      <Meeting />
                    </MeetingContextProvider>
                  </> :
                  <Navigate to="/login" />
                }
              />
              <Route 
                path='/announcement'
                element={ user ?
                  <>
                    <Header path="Announcements" />
                    <AnnouncementContextProvider>
                      <Announcement />
                    </AnnouncementContextProvider>
                  </> :
                  <Navigate to="/login" />
                }
              />
              <Route 
                path='/login'
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route 
                path='/signup'
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  )
}

export default App
