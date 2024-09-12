<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
const Settings = () => {
  //const [Address, setAddress] = useState()
  const [Value, setValue] = useState({ address: "" })
  const [ProfileData, setProfileData] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {

      const response = await axios.get('http://localhost:1000/api/v1/get-user-information', { headers })
      //setOrderHistory(response.data.data);
      setProfileData(response.data)
      setValue({ address: response.data.address })
    }
    fetch()
  }, [])
  const change = (e) => {
    const { name, value } = e.target
    setValue({ ...Value, [name]: value })
  }
  const submitAddress = async () => {
    const response = await axios.put('http://localhost:1000/api/v1/update-address', Value, { headers })
    alert(response.data.message)
  }
  return (
    <div>
      {!ProfileData && (<div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>)}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold'>Settings</h1>
          <div className='flex gap-12'>
            <div className='mt-5'>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div className='mt-5'>
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-user-information', { headers });
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put('http://localhost:1000/api/v1/update-address', Value, { headers });
    alert(response.data.message);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-zinc-900'>
      {!ProfileData ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='w-full max-w-3xl p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>Settings</h1>
          <div className='flex flex-col md:flex-row md:gap-12'>
            <div className='flex-1 mt-5'>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div className='flex-1 mt-5'>
>>>>>>> b38785e597742122962a30f530ad549743115f38
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.email}</p>
            </div>
          </div>
<<<<<<< HEAD
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea name="address" value={Value.address} onChange={change} className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows="5" placeholder='Address'></textarea>
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' onClick={submitAddress}>Update</button>
=======
          <div className='mt-8 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea 
              name="address" 
              value={Value.address} 
              onChange={change} 
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold' 
              rows="5" 
              placeholder='Address'
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button 
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' 
              onClick={submitAddress}
            >
              Update
            </button>
>>>>>>> b38785e597742122962a30f530ad549743115f38
          </div>
        </div>
      )}
    </div>
<<<<<<< HEAD
  )
}

export default Settings
=======
  );
};

export default Settings;
>>>>>>> b38785e597742122962a30f530ad549743115f38
