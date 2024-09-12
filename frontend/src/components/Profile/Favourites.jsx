<<<<<<< HEAD
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import { FaRegStar } from "react-icons/fa";
const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([])
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-favourite-books', { headers })
      setFavouriteBooks(response.data.data);
    }
    fetch()
  }, [FavouriteBooks])

  return (

    <>
      {FavouriteBooks.length === 0 && <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full gap-3'>No Favourite Books <FaRegStar />
        </div>}
      <div className='grid grid-cols-4 gap-2'>

        {FavouriteBooks && FavouriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favourites
=======
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import { FaRegStar } from "react-icons/fa";
import '../Navbar/Navbar.css'

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-favourite-books', { headers });
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      {FavouriteBooks.length === 0 ? (
        <div className='text-3xl md:text-5xl font-semibold text-zinc-500 flex flex-grow items-center justify-center w-full gap-3'>
          No Favourite Books <FaRegStar />
        </div>
      ) : (
        <div>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8 p-4'>Favourites</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 w-full max-w-screen-xl mx-auto'>
            {FavouriteBooks.map((items, i) => (
              <div key={i}>
                <BookCard data={items} favourite={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
>>>>>>> b38785e597742122962a30f530ad549743115f38
