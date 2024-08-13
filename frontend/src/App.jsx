import React from 'react'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import {  Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  path='/All-books' element={<AllBooks />} />
          <Route  path='/Signup' element={<Signup />} />
          <Route  path='/Login' element={<Login />} />
          <Route  path='/Cart' element={<Cart />} />
          <Route  path='/Profile' element={<Profile  />} />
          <Route path='view-book-details/:id' element={<ViewBookDetails/>}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default App