import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt={data.title} className='h-[25vh]' />
          </div>
          <h2 className='mt-4 text-white text-xl font-semibold'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
          
          {/* Price and Quantity Warning */}
          <div className='mt-2 flex items-center'>
            {data.discount > 0 ? (
              <>
                <p className='text-zinc-200 font-semibold text-xl line-through mr-2'>Rs. {data.price}</p>
                <p className='text-green-400 font-semibold text-xl'>Rs. {discountedPrice.toFixed(2)}</p>
              </>
            ) : (
              <p className='text-zinc-200 font-semibold text-xl'>Rs. {data.price}</p>
            )}
            {data.quantity === 0 ? (
              <p className='ml-4 text-red-500 font-semibold text-sm'>Out of Stock!</p>
            ) : data.quantity <= 5 && (
              <p className='ml-4 text-red-500 font-semibold text-sm'>Only few left!</p>
            )}
          </div>
        </div>
      </Link>
      
      {favourite && (
        <button
          className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-100 transition duration-300'
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
