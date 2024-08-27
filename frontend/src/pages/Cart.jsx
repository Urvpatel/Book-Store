import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, IconButton, Box, TextField } from '@mui/material';
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
          quantity: 1,  // Force quantity to start at 1
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
        const price = item.discount && item.discount > 0 ? item.discountedPrice : item.price;
        total += price * item.quantity;
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

  const handleQuantityChange = async (bookid, newQuantity) => {
    try {
      const bookResponse = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${bookid}`);
      const availableQuantity = bookResponse.data.data.quantity;

      if (newQuantity > availableQuantity) {
        alert("Not enough books!");
        return;
      }

      if (newQuantity < 1) {
        newQuantity = 1; // Ensure minimum quantity of 1
      }

      setCart(
        Cart.map((item) =>
          item._id === bookid ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error changing quantity:", error);
    }
  };

  const PlaceOrder = async () => {
    try {
      const orderItems = Cart.map(item => ({
        bookId: item._id, // Ensure this ID matches the ID in your database
        quantity: item.quantity,
      }));

      const response = await axios.post('http://localhost:1000/api/v1/place-order', { order: orderItems }, { headers });

      if (response.status === 200) {
        alert(response.data.message);
        navigate('/profile/orderHistory');
      }

      // Update the database quantity after placing an order
      await Promise.all(
        Cart.map(async (item) => {
          await axios.put(`http://localhost:1000/api/v1/update-book/${item._id}`, {
            quantity: item.quantity
          }, { headers });
        })
      );
    } catch (error) {
      console.error("Error placing order:", error); // Log the full error object for debugging
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || 'An unexpected error occurred';
      alert(`Error placing order: ${errorMessage}`);
    }
  };


  return (
    <div className='bg-zinc-900 px-4 md:px-12 min-h-screen flex flex-col'>
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
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>Your Cart</h1>
          <Grid container spacing={2}>
            {Cart.map((item, i) => (
              <Grid item xs={12} key={i}>
                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, backgroundColor: '#333', flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Link to={`/view-book-details/${item._id}`}>
                    <img src={item.url} alt="/" style={{ height: '150px', objectFit: 'cover', marginRight: { xs: '0', sm: '16px' }, marginBottom: { xs: '16px', sm: '0' } }} />
                  </Link>
                  <CardContent sx={{ flex: '1', minWidth: 0 }}>
                    <Link to={`/view-book-details/${item._id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="h5" color="white" sx={{ wordWrap: 'break-word' }}>{item.title}</Typography>
                    </Link>
                    <Typography variant="body2" color="gray">{item.desc.slice(0, 100)}...</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                    <IconButton onClick={() => handleQuantityChange(item._id, item.quantity - 1)} color="primary">
                      <Remove />
                    </IconButton>
                    <TextField
                      variant="outlined"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                      inputProps={{
                        min: 1,
                        style: { textAlign: 'center', color: 'white', MozAppearance: 'textfield', WebkitAppearance: 'none' }, // Hide arrows in Firefox and WebKit-based browsers
                      }}
                      sx={{
                        width: '60px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'lightgray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'white',
                          },
                        },
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                        '& input[type=number]': {
                          MozAppearance: 'textfield', // Firefox
                        },
                      }}
                    />
                    <IconButton onClick={() => handleQuantityChange(item._id, item.quantity + 1)} color="primary">
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" color="white" sx={{ marginRight: '16px', width: '150px', textAlign: 'right', marginTop: { xs: '16px', sm: '0' } }}>
                    {item.discount && item.discount > 0 ? (
                      <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Typography variant="body2" color="Darkgray" sx={{ textDecoration: 'line-through', marginRight: '8px', fontSize: '0.9rem' }}>
                          Rs. {item.price}
                        </Typography>
                        <Typography variant="h6" color="danger" sx={{ fontWeight: 'bold' }}>
                          Rs. {item.discountedPrice * item.quantity}
                        </Typography>
                      </Box>
                    ) : (
                      <>Rs. {item.price * item.quantity}</>
                    )}
                  </Typography>

                  <IconButton onClick={() => deleteItem(item._id)} color="error" sx={{ marginTop: { xs: '16px', sm: '0' } }}>
                    <AiFillDelete />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='mt-8 w-full flex items-center justify-end flex-grow'>
          <div className='p-4 bg-zinc-800 rounded w-full md:w-auto'>
            <Typography variant="h4" color="white" fontWeight="bold">Total Amount</Typography>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <Typography variant="h6">{Cart.length} Books</Typography>
              <Typography variant="h6">Rs. {Total}</Typography>
            </div>
            <div className='w-full mt-3'>
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
