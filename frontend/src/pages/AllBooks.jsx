import React, { useEffect, useState } from "react"
import axios from "axios"
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

function AllBooks() {
  const [Data, setData] = useState()
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-all-book');
      setData(response.data.data);
    };
    fetch()
  }, [])
  return (
    <div className='bg-zinc-900 px-12 py-8 h-auto'><h4 className='text-3xl text-yellow-100'>All Books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {!Data && (<div className='w-full h-screen flex items-center justify-center'><Loader />{" "}</div>)}
        {Data && Data.map((items, i) => <div key={i}><BookCard data={items} />{''} </div>)}
      </div></div>
  )
}

export default AllBooks