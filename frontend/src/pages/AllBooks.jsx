import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

function AllBooks() {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-book');
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    if (searchTerm.trim() === '') {
      setFilteredData(Data);
    } else {
      const filteredBooks = Data.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredBooks);
    }
  }, [location.search, Data]);

  return (
    <div className='bg-zinc-900 px-12 py-8 min-h-screen flex flex-col'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>All books</h1>

      <div className="my-8 flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {!filteredData.length && (
          <div className='w-full h-screen flex items-center justify-center'>
            <Loader />
          </div>
        )}
        {filteredData.map((items, i) => (
          <div key={i}>
            <BookCard data={items} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
