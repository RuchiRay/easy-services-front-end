import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navbar } from "./pages/LandingPage/Navbar";
import LandingPage from './pages/LandingPage'
import {BookingPage} from './pages/BookingPage/BookingPage'
import { Complete } from './pages/Complete'
function App() {
  return (
    <>
     
      <Router>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bookSlot" element={<BookingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/complete' element={<Complete />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
