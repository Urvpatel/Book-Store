<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import axios
 from 'axios'
const BookCard = ({ data, favourite }) => {
=======
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/delete-book-from-fav",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      alert("Failed to remove book from favourites.");
    }
  };

  // Calculate the discounted price
  const discountedPrice = data.price - (data.price * (data.discount / 100));
>>>>>>> b38785e597742122962a30f530ad549743115f38

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  }
  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/delete-book-from-fav", {},{ headers })
    alert(response.data.message);
  }
  return (
<<<<<<< HEAD
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
          <div className='bg-zinc-900 rounded flex itmes-center justify-center'><img src={data.url} alt="/" className='h-[25vh]' />
          </div>
          <h2 className='mt-4 text-white text-xl font-semibold'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>Rs. {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={handleRemoveBook}>Remove from Favourites</button>
      )}
    </div>
  )
}
=======
    <Box
      sx={{
        padding: 2,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        },
        // backgroundColor: '#1e1e1e',
        borderRadius: '8px',
      }}
    >
      <Link to={`/view-book-details/${data._id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#121212',
              borderRadius: '8px',
            }}
          >
            <img
              src={data.url}
              alt={data.title}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
            {data.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            by {data.author}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {data.discount > 0 ? (
              <>
                <Typography variant="body2" sx={{ color: '#fbc02d', fontWeight: 'bold' }}>
                  {data.discount}% OFF
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#bbb', textDecoration: 'line-through', display: 'inline-block', marginRight: '8px' }}
                >
                  ₹{data.price}
                </Typography>
                <Typography variant="h6" sx={{ color: '#fbc02d', fontWeight: 'bold', display: 'inline-block' }}>
                  ₹{discountedPrice.toFixed(2)}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" sx={{ color: '#fbc02d', fontWeight: 'bold' }}>
                ₹{data.price}
              </Typography>
            )}
            {data.quantity === 0 ? (
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold', mt: 1 }}>
                Out of Stock!
              </Typography>
            ) : data.quantity <= 5 && (
              <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold', mt: 1 }}>
                Only few left!
              </Typography>
            )}
          </Box>
        </Box>
      </Link>
>>>>>>> b38785e597742122962a30f530ad549743115f38

      {favourite && (
        <Button
          variant="outlined"
          color="warning"
          sx={{ mt: 2 }}
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </Button>
      )}
    </Box>
  );
};

export default BookCard;
