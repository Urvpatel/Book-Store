<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {

      const response = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers })
      setOrderHistory(response.data.data);
    }
    fetch()
  }, [])
  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {!OrderHistory && (<div className='w-full h-[100%] flex items-center justify-center'><Loader />{" "}</div>)}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>Your Order History</h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div className='bg-zinc-800 w-full py-2 -x-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer' key={i}>
              <div className='w-[3%]'>
                <h1 className='text-center ml-5'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                {items.book ? (
                  <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                    {items.book.title}
                  </Link>
                ) : (
                  <h1 className="text-red-500 text-center">Book Not Found</h1>
                )}
              </div>
              <div className='w-[45%]'>
                <h1 className='text-center'>
                  {items.book ? items.book.desc.slice(0, 50) + "..." : "No Description Available"}
                </h1>
              </div>
              <div className='w-[9%]'>
                <h1 className='text-center'>{items.book ? items.book.price : "N/A"}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Order Placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm text-zinc-400'>COD</h1>
              </div>
            </div>
          ))}


        </div>
      )}
    </div>
  )
}

export default UserOrderHistory
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers });
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 min-h-screen flex flex-col'>
      {!OrderHistory && (
        <div className='flex-grow flex items-center justify-center'>
          <Loader />{" "}
        </div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='flex-grow flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className='flex-grow p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>Your Order History</h1>
          <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 text-lg font-semibold text-blue-300'>
            <div className='w-[3%] text-center'>
              <h1>Sr.</h1>
            </div>
            <div className='w-[20%] text-center'>
              <h1>Books</h1>
            </div>
            <div className='w-[10%] text-center'>
              <h1>Quantity</h1>
            </div>
            <div className='w-[35%] text-center'>
              <h1>Description</h1>
            </div>
            <div className='w-[12%] text-center'>
              <h1>Total Price</h1>
            </div>
            <div className='w-[10%] text-center'>
              <h1>Status</h1>
            </div>
            <div className='w-none md:w-[5%] text-center hidden md:block'>
              <h1>Mode</h1>
            </div>
          </div>
          <div
            className='overflow-y-auto'
            style={{
              maxHeight: 'calc(100vh - 12rem)',
              overflowY: 'scroll',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none',  // Internet Explorer 10+
            }}
          >
            <div
              style={{
                maxHeight: '100%',
                overflowY: 'scroll',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none',  // Internet Explorer 10+
              }}
            >
              {OrderHistory.map((items, i) => (
                <div className='bg-zinc-800 w-full py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer text-sm text-zinc-300' key={i}>
                  <div className='w-[3%] text-center'>
                    <h1>{i + 1}</h1>
                  </div>
                  <div className='w-[20%] text-center'>
                    {items.book ? (
                      <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                        {items.book.title}
                      </Link>
                    ) : (
                      <h1 className="text-red-500">Book Not Found</h1>
                    )}
                  </div>
                  <div className='w-[10%] text-center'>
                    <h1>{items.quantity}</h1>
                  </div>
                  <div className='w-[35%] text-center'>
                    <h1>
                      {items.book ? items.book.desc.slice(0, 50) + "..." : "No Description Available"}
                    </h1>
                  </div>
                  <div className='w-[12%] text-center'>
                    <h1>{items.book ? `Rs. ${items.book.price * items.quantity}` : "N/A"}</h1>
                  </div>
                  <div className='w-[10%] text-center'>
                    <h1 className={`font-semibold ${items.status === "Order Placed" ? 'text-yellow-500' : items.status === "Canceled" ? 'text-red-500' : 'text-green-500'}`}>
                      {items.status}
                    </h1>
                  </div>
                  <div className='w-none md:w-[5%] text-center hidden md:block'>
                    <h1 className='text-zinc-400'>COD</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrderHistory;
>>>>>>> b38785e597742122962a30f530ad549743115f38
