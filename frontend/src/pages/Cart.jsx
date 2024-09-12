// import React, { useEffect, useState } from 'react'
// import Loader from '../components/Loader/Loader'
// import { AiFillDelete } from "react-icons/ai";
// import axios from 'axios';

// const Cart = () => {
//   const [Cart, setCart] = useState([])
//   const [Total, setTotal] = useState(0)
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   }
//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers })
//       setCart(response.data.data);
//     }
//     fetch()
//   }, [Cart])
//   return (
//     <>
//       {!Cart && <Loader />}
//       {!Cart && Cart.length === 0 && (
//         <div className="h-screen">
//           <div className='h-[100%] flex items-center justify-center flex-col'>
//             <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
//           </div>
//         </div>
//       )}
//       {Cart && Cart.length > 0 && (
//         <>
//           <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
//           {Cart.map((items, i) => {
//             <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
//               <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
//               <div className='w-full md:w-auto'>
//                 <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
//                 <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0, 100)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{items.desc.slice(0, 100)}...</p>
//               </div>
//               <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
//                 <h2 className='text-zinx-100 text-3xl font-semibold flex'>Rs. {items.price}</h2>
//                 <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}><AiFillDelete /></button>
//               </div>
//             </div>
//           })}
//         </>
//       )}
//     </>
//   )
// }

// export default Cart

// import React, { useEffect, useState } from 'react'
// import Loader from '../components/Loader/Loader'
// import { AiFillDelete } from "react-icons/ai";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const navigate = useNavigate()
//   const [Cart, setCart] = useState([])
//   const [Total, setTotal] = useState(0)
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   }

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers })
//         setCart(response.data.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     }
//     fetch()
//   }, [Cart]) 
  
//   const deleteItem = async (bookid) => {
//     const response = await axios.put(`http://localhost:1000/api/v1/delete-book-from-cart/${bookid}`, {}, { headers })
//     alert(response.data.message);

//   }
//   useEffect(() => {
//     if (Cart && Cart.length > 0) {
//       let total = 0
//       Cart.map((items) => {
//         total += items.price
//       })
//       setTotal(total)
//       total = 0
//     }
//   }, [Cart])

//   const PlaceOrder = async () => {
//     try {
//       const response = await axios.post('http://localhost:1000/api/v1/place-order', { order: Cart }, { headers });
//       alert(response.data.message);
//       //navigate('/profile/orderHistory');
//     } catch (error) {
//       //console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert(`Error placing order: ${error.response ? error.response.data.message : 'Server Error'}`);
//     }
//   };
  


//   return (
//     <div className='bg-zinc-900 px-12 h-screen py-8'>
//       {!Cart && (<div className='w-full h-[100%] flex items-center justify-center'><Loader />{" "}</div>)}
//       {Cart.length === 0 && (
//         <div className="h-screen">
//           <div className='h-[100%] flex items-center justify-center flex-col'>
//             <h1 className='text-3xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
//             <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty cart" className='lg:h-[50vh]'/>
//           </div>
//         </div>
//       )}
//       {Cart.length > 0 && (
//         <>
//           <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
//           {Cart.map((items, i) => (
//             <div className='w-full my-4 flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
//               <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
//               <div className='w-full md:w-auto'>
//                 <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
//                 <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0, 100)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{items.desc.slice(0, 100)}...</p>
//               </div>
//               <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
//                 <h2 className='text-zinc-100 text-3xl font-semibold flex'>Rs. {items.price}</h2>
//                 <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}><AiFillDelete /></button>
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//       {Cart && Cart.length > 0 && (
//         <div className='mt-4 w-full flex items-center justify-end'>
//           <div className='p-4 bg-zinc-800 rounded'>
//             <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
//             <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
//               <h2>{Cart.length} Books</h2>
//               <h2>Rs. {Total}</h2>
//             </div>
//             <div className='w-[100%] mt-3'>
//               <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-100' onClick={PlaceOrder}>Place Your Order</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cart



import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers });
        const cartData = response.data.data.map(item => ({
          ...item,
          quantity: item.quantity || 1,  // Initialize quantity if undefined
          price: parseFloat(item.price) || 0, // Initialize price if not a number
        }));
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    }
  }, [Cart]);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(`http://localhost:1000/api/v1/delete-book-from-cart/${bookid}`, {}, { headers });
      alert(response.data.message);
      setCart(Cart.filter(item => item._id !== bookid));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const increaseQuantity = (bookid) => {
    setCart(
      Cart.map((item) =>
        item._id === bookid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (bookid) => {
    setCart(
      Cart.map((item) =>
        item._id === bookid && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:1000/api/v1/place-order', { order: Cart }, { headers });
      alert(response.data.message);
      // navigate('/profile/orderHistory');
    } catch (error) {
      alert(`Error placing order: ${error.response ? error.response.data.message : 'Server Error'}`);
    }
  };

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {!Cart && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Cart.length === 0 && (
        <div className="h-screen">
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-3xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty cart" className='lg:h-[50vh]' />
          </div>
        </div>
      )}
      {Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          <Grid container spacing={2}>
            {Cart.map((item, i) => (
              <Grid item xs={12} key={i}>
                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, backgroundColor: '#333' }}>
                  <img src={item.url} alt="/" style={{ height: '150px', objectFit: 'cover', marginRight: '16px' }} />
                  <CardContent sx={{ flex: '1' }}>
                    <Typography variant="h5" color="white" noWrap>{item.title}</Typography>
                    <Typography variant="body2" color="gray" noWrap>{item.desc.slice(0, 100)}...</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => decreaseQuantity(item._id)} color="primary">
                      <Remove />
                    </IconButton>
                    <Typography variant="h6" color="white" sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => increaseQuantity(item._id)} color="primary">
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" color="white" sx={{ marginRight: '16px' }}>Rs. {item.price * item.quantity}</Typography>
                  <IconButton onClick={() => deleteItem(item._id)} color="error">
                    <AiFillDelete />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <Typography variant="h4" color="white" fontWeight="bold">Total Amount</Typography>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <Typography variant="h6">{Cart.length} Books</Typography>
              <Typography variant="h6">Rs. {Total}</Typography>
            </div>
            <div className='w-[100%] mt-3'>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: '#e0e0e0', color: '#000', '&:hover': { backgroundColor: '#d4d4d4' } }}
                onClick={PlaceOrder}
              >
                Place Your Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
