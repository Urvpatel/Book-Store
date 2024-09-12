import React, { useEffect } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
<<<<<<< HEAD
=======
import AddCategories from './pages/AddCategories'
import AllCategories from './pages/AllCategories'
import BookListByCategory from './components/BookListByCategory/BookListByCategory'
>>>>>>> b38785e597742122962a30f530ad549743115f38

const App = () => {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} >
          {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}
          {role === "admin" && <Route path='/profile/add-book' element={<AddBook />} />}
<<<<<<< HEAD
=======
          {role === "admin" && <Route path='/profile/add-category' element={<AddCategories />} />}
          {role === "admin" && <Route path='/profile/all-category' element={<AllCategories />} />}
>>>>>>> b38785e597742122962a30f530ad549743115f38
          <Route path='/profile/orderHistory' element={<UserOrderHistory />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updateBook/:id' element={<UpdateBook />} />
        <Route path='view-book-details/:id' element={<ViewBookDetails />} />
<<<<<<< HEAD
=======
          {/* New Route for BookListByCategory */}
          <Route path='/books/category/:categoryId' element={<BookListByCategory />} />
          {/* <Route path='/books/category/:categoryId/:subcategoryId' element={<BookListByCategory />} /> */}
>>>>>>> b38785e597742122962a30f530ad549743115f38
      </Routes>
      <Footer />
    </div>
  )
}

export default App