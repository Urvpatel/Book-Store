import React from 'react'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  path='/All-books' element={<AllBooks />} />
          <Route  path='/Signup' element={<Signup />} />
          <Route  path='/Login' element={<Login />} />
          <Route  path='/Cart' element={<Cart />} />
          <Route  path='/Profile' element={<Profile  />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App