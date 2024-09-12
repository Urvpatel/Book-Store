<<<<<<< HEAD
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Loader from '../components/Loader/Loader'
// import { FaCheck, FaUserLarge } from 'react-icons/fa6'
// import { Link, useParams } from 'react-router-dom'
// import { IoOpenOutline } from 'react-icons/io5'
// import SeeUserData from './SeeUserData'

// const AllOrders = () => {
//     const { id } = useParams()
//     const [userDiv, setuserDiv] = useState("hidden")
//     const [userDivData, setuserDivData] = useState()
//     const [Options, setOptions] = useState(-1)
//     const [AllOrders, setAllOrders] = useState([])
//     const [Values, setValues] = useState({ status: "" })
//     const change = (e) => {
//         const { value } = e.target
//         setValues({ status: value })
//     }
//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     }
//     useEffect(() => {
//         const fetch = async () => {
//             const response = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers })
//             setAllOrders(response.data.data);
//         }
//         fetch()
//     }, [AllOrders])
//     const submitChanges = async (i) => {
//         const id = AllOrders[i]._id
//         const response = await axios.put(`http://localhost:1000/api/v1/status/${id}`, Values, { headers })
//         alert(response.data.message)
//     }
//     AllOrders && AllOrders.splice(AllOrders.length - 1, 1)
//     return (
//         <>
//             {!AllOrders && (<div className='w-full h-[100%] flex items-center justify-center'><Loader />{" "}</div>)}
//             {AllOrders && AllOrders.length > 0 && (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1 className='text-center'>Sr.</h1>
//                         </div>
//                         <div className='s-[40%] md:w-[22%]'>
//                             <h1 className='text-center'>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block'>
//                             <h1 className='text-center'>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1 className='text-center'>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1 className='text-center'>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%]'>
//                             <h1 className='text-center'><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {AllOrders && AllOrders.map((items, i) => (
//                         <div className='bg-zinc-800 w-full rounded py-2 px-4 gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                             <div className='w-[3%]'>
//                                 <h1 className='text-center'>{i + 1}</h1>
//                             </div>
//                             <div className='w-[40%] md:w-[22%]'>
//                                 <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
//                             </div>
//                             <div className='w-0 md:w-[45%] hidden md:block'>
//                                 <h1 className=''>{items.book.desc.slice(0, 50)}...</h1>
//                             </div>
//                             <div className='w-[17%] md:w-[9%]'>
//                                 <h1 className=''>Rs. {items.book.price}</h1>
//                             </div>
//                             <div className='w-[30%] md:w-[16%]'>
//                                 <h1 className='font-semibold'>
//                                     <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
//                                         {items.status === "Order Placed" ? (
//                                             <div className='text-yellow-500'>{items.status}</div>
//                                         ) : items.status === "Canceled" ? (
//                                             <div className='text-red-500'>{items.status}</div>
//                                         ) : (
//                                             <div className='text-green-500'>{items.status}</div>
//                                         )}
//                                     </button>
//                                     <div className={`${Options === i ? "flex" : "hidden"}`}>
//                                         <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>{[
//                                             "Order Placed",
//                                             "Out for delivery",
//                                             "Delivered",
//                                             "Canceled",
//                                         ].map((items, i) => (
//                                             <option value={items} key={i}>{items}</option>
//                                         ))}</select>
//                                         <button className='text-green-500 hover:text-pink-600 mx-2'
//                                             onClick={() => {
//                                                 setOptions(-1)
//                                                 submitChanges(i)
//                                             }}><FaCheck /></button>
//                                     </div>
//                                 </h1>
//                             </div>
//                             <div className='w-[10%] md:w-[5%]'>
//                                 <button className='text-xl hover:text-orange-500' onClick={() => {
//                                     setuserDiv("fixed")
//                                     setuserDivData(items.user)
//                                 }}>
//                                     <IoOpenOutline />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {userDivData && (
//                 <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
//             )}
//         </>
//     )
// }

// export default AllOrders




//chatgpt
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../components/Loader/Loader';
// import { FaCheck, FaUserLarge } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// import { IoOpenOutline } from 'react-icons/io5';

// const AllOrders = () => {
//     const [options, setOptions] = useState(-1);
//     const [allOrders, setAllOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const headers = {
//         id: localStorage.getItem("id"),
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//     };

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:1000/api/v1/get-all-order', { headers });
//                 setAllOrders(response.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     const handleSetOptions = (index) => {
//         setOptions(index);
//     };

//     return (
//         <>
//             {loading ? (
//                 <div className='w-full h-[100%] flex items-center justify-center'>
//                     <Loader />{" "}
//                 </div>
//             ) : allOrders.length > 0 ? (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1 className='text-center'>Sr.</h1>
//                         </div>
//                         <div className='w-[40%] md:w-[22%]'>
//                             <h1 className='text-center'>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block'>
//                             <h1 className='text-center'>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1 className='text-center'>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1 className='text-center'>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%]'>
//                             <h1 className='text-center'><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {allOrders.map((order, index) => {
//                         const { book, status, user } = order;
//                         const bookExists = book && book._id;
//                         return (
//                             <div className='bg-zinc-800 w-full rounded py-2 px-4 gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={index}>
//                                 <div className='w-[3%]'>
//                                     <h1 className='text-center'>{index + 1}</h1>
//                                 </div>
//                                 <div className='w-[40%] md:w-[22%]'>
//                                     {bookExists ? (
//                                         <Link to={`/view-book-details/${book._id}`} className='hover:text-blue-300'>{book.title}</Link>
//                                     ) : (
//                                         <span>Book Unavailable</span>
//                                     )}
//                                 </div>
//                                 <div className='w-0 md:w-[45%] hidden md:block'>
//                                     <h1 className=''>{bookExists ? book.desc.slice(0, 50) + '...' : 'Description Unavailable'}</h1>
//                                 </div>
//                                 <div className='w-[17%] md:w-[9%]'>
//                                     <h1 className=''>{bookExists ? `Rs. ${book.price}` : 'N/A'}</h1>
//                                 </div>
//                                 <div className='w-[30%] md:w-[16%]'>
//                                     <h1 className='font-semibold'>
//                                         <button className='hover:scale-105 transition-all duration-300' onClick={() => handleSetOptions(index)}>
//                                             {status === "Order Placed" ? (
//                                                 <div className='text-yellow-500'>{status}</div>
//                                             ) : status === "Canceled" ? (
//                                                 <div className='text-red-500'>{status}</div>
//                                             ) : (
//                                                 <div className='text-green-500'>{status}</div>
//                                             )}
//                                         </button>
//                                         <div className='flex'>
//                                             <select name="status" id="" className='bg-gray-800'>
//                                                 {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map((status, i) => (
//                                                     <option value={status} key={i}>{status}</option>
//                                                 ))}
//                                             </select>
//                                             <button className='text-green-500 hover:text-pink-600 mx-2'><FaCheck /></button>
//                                         </div>
//                                     </h1>
//                                 </div>
//                                 <div className='w-[10%] md:w-[5%]'>
//                                     <button className='text-xl hover:text-orange-500' onClick={() => {
//                                         setUserDiv("fixed");
//                                         setUserDivData(user);
//                                     }}>
//                                         <IoOpenOutline />
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             ) : (
//                 <div className='w-full h-[100%] flex items-center justify-center'>
//                     <h2 className='text-zinc-500'>No Orders Found</h2>
//                 </div>
//             )}
//         </>
//     );
// };

// export default AllOrders;




//chatgpt2
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../components/Loader/Loader';
// import { FaCheck, FaUserLarge } from 'react-icons/fa6';
// import { Link, useParams } from 'react-router-dom';
// import { IoOpenOutline } from 'react-icons/io5';
// import SeeUserData from './SeeUserData';

// const AllOrders = () => {
//     const { id } = useParams();
//     const [userDiv, setuserDiv] = useState("hidden");
//     const [userDivData, setuserDivData] = useState();
//     const [Options, setOptions] = useState(-1);
//     const [AllOrders, setAllOrders] = useState([]);
//     const [StatusValues, setStatusValues] = useState({});

//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     };

//     useEffect(() => {
//         const fetch = async () => {
//             try {
//                 const response = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers });
//                 setAllOrders(response.data.data || []);
//                 const initialStatusValues = {};
//                 response.data.data.forEach((order, index) => {
//                     initialStatusValues[order._id] = order.status;
//                 });
//                 setStatusValues(initialStatusValues);
//             } catch (error) {
//                 console.error("Failed to fetch orders:", error);
//                 setAllOrders([]); // Set an empty array if there is an error
//             }
//         };
//         fetch();
//     }, []);

//     const handleStatusChange = (e, orderId) => {
//         const { value } = e.target;
//         setStatusValues(prevValues => ({
//             ...prevValues,
//             [orderId]: value
//         }));
//     };

//     const submitChanges = async (orderId) => {
//         if (!orderId) return; // Return early if orderId is undefined

//         try {
//             const response = await axios.put(`http://localhost:1000/api/v1/status/${orderId}`, { status: StatusValues[orderId] }, { headers });
//             alert(response.data.message);
//         } catch (error) {
//             console.error("Failed to update order status:", error);
//         }
//     };

//     return (
//         <>
//             {!AllOrders.length ? (
//                 <div className='w-full h-[100%] flex items-center justify-center'>
//                     <Loader />{" "}
//                 </div>
//             ) : (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1 className='text-center'>Sr.</h1>
//                         </div>
//                         <div className='w-[40%] md:w-[22%]'>
//                             <h1 className='text-center'>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block'>
//                             <h1 className='text-center'>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1 className='text-center'>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1 className='text-center'>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%]'>
//                             <h1 className='text-center'><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {AllOrders && AllOrders.map((items, i) => (
//                         items.book ? (
//                             <div className='bg-zinc-800 w-full rounded py-2 px-4 gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                                 <div className='w-[3%]'>
//                                     <h1 className='text-center'>{i + 1}</h1>
//                                 </div>
//                                 <div className='w-[40%] md:w-[22%]'>
//                                     <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
//                                 </div>
//                                 <div className='w-0 md:w-[45%] hidden md:block'>
//                                     <h1 className=''>{items.book.desc.slice(0, 50)}...</h1>
//                                 </div>
//                                 <div className='w-[17%] md:w-[9%]'>
//                                     <h1 className=''>Rs. {items.book.price}</h1>
//                                 </div>
//                                 <div className='w-[30%] md:w-[16%] relative'>
//                                     <h1 className='font-semibold'>
//                                         <button
//                                             className='hover:scale-105 transition-all duration-300'
//                                             onClick={() => setOptions(i)}
//                                         >
//                                             {items.status === "Order Placed" ? (
//                                                 <div className='text-yellow-500'>{items.status}</div>
//                                             ) : items.status === "Canceled" ? (
//                                                 <div className='text-red-500'>{items.status}</div>
//                                             ) : (
//                                                 <div className='text-green-500'>{items.status}</div>
//                                             )}
//                                         </button>

//                                         {/* Dropdown container */}
//                                         <div
//                                             className={`${Options === i ? "flex" : "blo"} 
//             absolute top-full left-0 bg-gray-800 rounded-md shadow-lg mt-2 z-10`}
//                                         >
//                                             <select
//                                                 name="status"
//                                                 className='bg-gray-800 text-white p-2 rounded-md'
//                                                 onChange={(e) => handleStatusChange(e, items._id)}
//                                                 value={StatusValues[items._id]}
//                                             >
//                                                 {[
//                                                     "Order Placed",
//                                                     "Out for delivery",
//                                                     "Delivered",
//                                                     "Canceled",
//                                                 ].map((option, idx) => (
//                                                     <option value={option} key={idx}>
//                                                         {option}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <button
//                                                 className='text-green-500 hover:text-pink-600 mx-2'
//                                                 onClick={() => {
//                                                     setOptions(-1);
//                                                     submitChanges(items._id);
//                                                 }}
//                                             >
//                                                 <FaCheck />
//                                             </button>
//                                         </div>
//                                     </h1>
//                                 </div>

//                                 <div className='w-[10%] md:w-[5%]'>
//                                     <button className='text-xl hover:text-orange-500' onClick={() => {
//                                         setuserDiv("fixed")
//                                         setuserDivData(items.user)
//                                     }}>
//                                         <IoOpenOutline />
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div key={i} className="text-red-500">Book data not available</div>
//                         )
//                     ))}

//                 </div>
//             )}
//             {userDivData && (
//                 <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
//             )}
//         </>
//     );
// };

// export default AllOrders;





//urv
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Loader from '../components/Loader/Loader'
// import { FaCheck, FaUserLarge } from 'react-icons/fa6'
// import { Link, useParams } from 'react-router-dom'
// import { IoOpenOutline } from 'react-icons/io5'
// import SeeUserData from './SeeUserData'
// const AllOrders = () => {
//     const [AllOrders, setAllOrders] = useState()
//     const [Options, setOptions] = useState(-1)
//     const [Values, setValues] = useState({ status: "" })
//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: Bearer ${ localStorage.getItem("token")
// },
//     }
// useEffect(() => {
//     const fetch = async () => {
//         const response = await axios.get('http://localhost:1000/api/v1/get-all-order', { headers })
//         setAllOrders(response.data.data);
//     }
//     fetch()
// }, [AllOrders])
// const change = (e) => {
//     const { value } = e.target
//     setValues({ status: value })
// }
// const submitChanges = async (i) => {
//     const id = AllOrders[i]._id
//     const response = await axios.put(`http://localhost:1000/api/v1/status/${id}`, Values, { headers })
//     alert(response.data.message)
// }
// AllOrders && AllOrders.splice(AllOrders.length - 1, 1)
// return (
//     <>
//         {!AllOrders && (<div className='h-[100%] flex items-center justify-center'>{""}<Loader />{" "}</div>)}
//         {AllOrders && AllOrders.length > 0 && (
//             <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                 <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All orders</h1>
//                 <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                     <div className='w-[3%]'>
//                         <h1 className='text-center'>Sr.</h1>
//                     </div>
//                     <div className='w-[22%]'>
//                         <h1 className='text-center'>Books</h1>
//                     </div>
//                     <div className='w-[45%]'>
//                         <h1 className='text-center'>Description</h1>
//                     </div>
//                     <div className='w-[9%]'>
//                         <h1 className='text-center'>Price</h1>
//                     </div>
//                     <div className='w-[16%]'>
//                         <h1 className='text-center'>Status</h1>
//                     </div>
//                     <div className='w-[10%] md:w-[5%]'>
//                         <h1 className=''><FaUserLarge /></h1>
//                     </div>
//                 </div>
//                 {AllOrders.map((items, i) => (
//                         <div className='bg-zinc-800 w-full rounded py-2 px-4 gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                             <div className='w-[3%]'>
//                                 <h1 className='text-center'>{i + 1}</h1>
//                             </div>
//                             <div className='w-[40%] md:w-[22%]'>
//                                 <Link to={/view-book-details/${items.book._id}} className='hover:text-blue-300'>{items.book.title}</Link>
//                             </div>
//                             <div className='w-0 md:w-[45%] hidden md:block'>
//                                 <h1 className=''>{items.book.desc.slice(0, 50)}...</h1>
//                             </div>
//                             <div className='w-[17%] md:w-[9%]'>
//                                 <h1 className=''>Rs. {items.book.price}</h1>
//                             </div>
//                             <div className='w-[30%] md:w-[16%]'>
//                                 <h1 className='font-semibold'>
//                                     <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
//                                         {items.status === "Order Placed" ? (
//                                             <div className='text-yellow-500'>{items.status}</div>
//                                         ) : items.status === "Canceled" ? (
//                                             <div className='text-red-500'>{items.status}</div>
//                                         ) : (
//                                             <div className='text-green-500'>{items.status}</div>
//                                         )}
//                                     </button>
//                                     {Options === i && <div className= {${Options === i ?"flex":"hidden"}}>
//                                         <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>{[
//                                             "Order Placed",
//                                             "Out for delivery",
//                                             "Delivered",
//                                             "Canceled",
//                                         ].map((items, i) => (
//                                             <option value={items} key={i}>{items}</option>
//                                         ))}</select>
//                                         <button className='text-green-500 hover:text-pink-600 mx-2'
//                                             onClick={() => {
//                                                 setOptions(-1)
//                                                 submitChanges(i)
//                                             }}><FaCheck /></button>
//                                     </div>}
//             </h1>
//                             </div >
//     <div className='w-[10%] md:w-[5%]'>
//         <button className='text-xl hover:text-orange-500' onClick={() => {
//             setuserDiv("fixed")
//             setuserDivData(items.user)
//         }}>
//             <IoOpenOutline />
//         </button>
//     </div>
//                         </div >
//                     ))}
//             </div >
//           )}
//     </>
//   )
// }

// export default AllOrders



//urv2
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Loader from '../components/Loader/Loader'
// import { Link } from 'react-router-dom'
// import { IoOpenOutline } from 'react-icons/io5'
// import { FaCheck, FaUserLarge } from 'react-icons/fa6'
// import SeeUserData from './SeeUserData'
// function AllOrders() {
//     const [AllOrders, setAllOrders] = useState()
//     const [Values, setValues] = useState({ status: "" });
//     const [userDiv, setuserDiv] = useState("hidden")
//     const [userDivData, setuserDivData] = useState("hidden")
//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     }
//     const [Options, setOptions] = useState(-1)
//     useEffect(() => {
//         const fetch = async () => {
//             const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
//             setAllOrders(response.data.data)
//         }
//         fetch();
//     }, [AllOrders])

//     const change = (e) => {
//         const { value } = e.target;
//         setValues({ status: value });
//     }
//     const submitChanges = async (i) => {
//         const id = AllOrders[i]._id;
//         try {
//             const response = await axios.put(`http://localhost:1000/api/v1/status/${id}`, Values, { headers });
//             // Assuming the response data structure is { status: "success", message: "Status updated successfully" }
//             alert(response.data.message);
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             alert('Failed to update order status. Please check the console for more details.');
//         }
//     }
//     // const setOptionsButton = (i) =>{
//     //     setOptions(i)
//     // }
//     AllOrders && AllOrders.splice(AllOrders.length - 1, 1)
//     return (
//         <>
//             {!AllOrders && (<div className="h-[100%] flex items-center justify-center"><Loader /></div>)}
//             {AllOrders && AllOrders.length > 0 && (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1 className=''>Sr.</h1>
//                         </div>
//                         <div className='w-[40%] md:w-[22%]'>
//                             <h1 className=''>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block '>
//                             <h1 className=''>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1 className=''>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1 className=''>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%] '>
//                             <h1 className=''><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {AllOrders.map((items, i) => (
//                         <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                             <div className='w-[3%]'>
//                                 <h1 className='text-center'>{i + 1}</h1> {/* This is the Sr. column */}
//                             </div>
//                             <div className='w-[40%] md:w-[22%]'>
//                                 {items.book && items.book._id ? (
//                                     <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
//                                         {items.book.title}
//                                     </Link>
//                                 ) : (
//                                     <span className='text-red-500'>No Book Info</span>
//                                 )}
//                             </div>
//                             <div className='w-0 md:w-[45%] hidden md:block'>
//                                 <h1 className=''>{items.book?.desc?.slice(0, 50)}...</h1>
//                             </div>
//                             <div className='w-[17%] md:w-[9%]'>
//                                 <h1 className=''>Rs. {items.book?.price}</h1>
//                             </div>
//                             <div className='w-[30%] md:w-[16%]'>
//                                 <h1 className='font-semibold'>
//                                     <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)} >
//                                         {items.status === "Order Placed" ? (
//                                             <div className='text-yellow-500'>{items.status}</div>
//                                         ) : items.status === "Canceled" ? (
//                                             <div className='text-red-500'>{items.status}</div>
//                                         ) : (
//                                             <div className='text-green-500'>{items.status}</div>
//                                         )}
//                                     </button>
//                                     <div className={`${Options === i ? "flex" : "hidden"}`}>
//                                         <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
//                                             {[
//                                                 "Order Placed",
//                                                 "Out for delivery",
//                                                 "Delivered",
//                                                 "Canceled",
//                                             ].map((statusItem, j) => (
//                                                 <option value={statusItem} key={j}>{statusItem}</option>
//                                             ))}
//                                         </select>
//                                         <button className='text-green-500 hover:text-pink-600 mx-2'
//                                             onClick={() => {
//                                                 setOptions(-1)
//                                                 submitChanges(i)
//                                             }}><FaCheck /></button>
//                                     </div>
//                                 </h1>
//                             </div>
//                             <div className='w-[10%] md:w-[5%]'>
//                                 <button className='text-xl hover:text-orange-500' onClick={() => {
//                                     setuserDiv("fixed");
//                                     setuserDivData(items.user)
//                                 }}>
//                                     <IoOpenOutline />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />)}
//         </>
//     )
// }

// export default AllOrders




//urv3
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Loader from '../components/Loader/Loader'
// import { Link } from 'react-router-dom'
// import { IoOpenOutline } from 'react-icons/io5'
// import { FaCheck, FaUserLarge } from 'react-icons/fa6'
// import SeeUserData from './SeeUserData'

// function AllOrders() {
//     const [AllOrders, setAllOrders] = useState()
//     const [Values, setValues] = useState({ status: "" });
//     const [userDiv, setuserDiv] = useState("hidden")
//     const [userDivData, setuserDivData] = useState("hidden")
//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     }
//     const [Options, setOptions] = useState(-1)

//     useEffect(() => {
//         const fetch = async () => {
//             const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
//             setAllOrders(response.data.data)
//         }
//         fetch();
//     }, [])  // <-- Empty dependency array

//     const change = (e) => {
//         const { value } = e.target;
//         setValues({ status: value });
//     }

//     const submitChanges = async (i) => {
//         const id = AllOrders[i]._id;
//         try {
//             const response = await axios.put(`http://localhost:1000/api/v1/status/${id}`, Values, { headers });
//             alert(response.data.message);
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             alert('Failed to update order status. Please check the console for more details.');
//         }
//     }

//     AllOrders && AllOrders.splice(AllOrders.length - 1, 1)
    
//     return (
//         <>
//             {!AllOrders && (<div className="h-[100%] flex items-center justify-center"><Loader /></div>)}
//             {AllOrders && AllOrders.length > 0 && (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1 className=''>Sr.</h1>
//                         </div>
//                         <div className='w-[40%] md:w-[22%]'>
//                             <h1 className=''>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block '>
//                             <h1 className=''>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1 className=''>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1 className=''>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%] '>
//                             <h1 className=''><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {AllOrders.map((items, i) => (
//                         <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                             <div className='w-[3%]'>
//                                 <h1 className='text-center'>{i + 1}</h1> {/* This is the Sr. column */}
//                             </div>
//                             <div className='w-[40%] md:w-[22%]'>
//                                 {items.book && items.book._id ? (
//                                     <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
//                                         {items.book.title}
//                                     </Link>
//                                 ) : (
//                                     <span className='text-red-500'>No Book Info</span>
//                                 )}
//                             </div>
//                             <div className='w-0 md:w-[45%] hidden md:block'>
//                                 <h1 className=''>{items.book?.desc?.slice(0, 50)}...</h1>
//                             </div>
//                             <div className='w-[17%] md:w-[9%]'>
//                                 <h1 className=''>Rs. {items.book?.price}</h1>
//                             </div>
//                             <div className='w-[30%] md:w-[16%]'>
//                                 <h1 className='font-semibold'>
//                                     <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)} >
//                                         {items.status === "Order Placed" ? (
//                                             <div className='text-yellow-500'>{items.status}</div>
//                                         ) : items.status === "Canceled" ? (
//                                             <div className='text-red-500'>{items.status}</div>
//                                         ) : (
//                                             <div className='text-green-500'>{items.status}</div>
//                                         )}
//                                     </button>
//                                     <div className={`${Options === i ? "flex" : "hidden"}`}>
//                                         <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
//                                             {[
//                                                 "Order Placed",
//                                                 "Out for delivery",
//                                                 "Delivered",
//                                                 "Canceled",
//                                             ].map((statusItem, j) => (
//                                                 <option value={statusItem} key={j}>{statusItem}</option>
//                                             ))}
//                                         </select>
//                                         <button className='text-green-500 hover:text-pink-600 mx-2'
//                                             onClick={() => {
//                                                 setOptions(-1)
//                                                 submitChanges(i)
//                                             }}><FaCheck /></button>
//                                     </div>
//                                 </h1>
//                             </div>
//                             <div className='w-[10%] md:w-[5%]'>
//                                 <button className='text-xl hover:text-orange-500' onClick={() => {
//                                     setuserDiv("fixed");
//                                     setuserDivData(items.user)
//                                 }}>
//                                     <IoOpenOutline />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />)}
//         </>
//     )
// }

// export default AllOrders



//urv4
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Loader from '../components/Loader/Loader'
// import { Link } from 'react-router-dom'
// import { IoOpenOutline } from 'react-icons/io5'
// import { FaCheck, FaUserLarge } from 'react-icons/fa6'
// import SeeUserData from './SeeUserData'

// function AllOrders() {
//     const [AllOrders, setAllOrders] = useState([])
//     const [Values, setValues] = useState({ status: "" });
//     const [userDiv, setuserDiv] = useState("hidden")
//     const [userDivData, setuserDivData] = useState("hidden")
//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     }
//     const [Options, setOptions] = useState(-1)

//     useEffect(() => {
//         const fetch = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
//                 setAllOrders(response.data.data)
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             }
//         }
//         fetch();
//     }, [])

//     const change = (e) => {
//         const { value } = e.target;
//         setValues({ status: value });
//     }

//     const submitChanges = async (i) => {
//         const id = AllOrders[i]._id;
//         try {
//             const response = await axios.put(`http://localhost:1000/api/v1/status/${id}`, Values, { headers });
//             alert(response.data.message);
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             alert('Failed to update order status. Please check the console for more details.');
//         }
//     }

//     return (
//         <>
//             {!AllOrders.length && (
//                 <div className="h-[100%] flex items-center justify-center">
//                     <Loader />
//                 </div>
//             )}
//             {AllOrders.length > 0 && (
//                 <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//                     <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
//                     <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//                         <div className='w-[3%]'>
//                             <h1>Sr.</h1>
//                         </div>
//                         <div className='w-[40%] md:w-[22%]'>
//                             <h1>Books</h1>
//                         </div>
//                         <div className='w-0 md:w-[45%] hidden md:block '>
//                             <h1>Description</h1>
//                         </div>
//                         <div className='w-[17%] md:w-[9%]'>
//                             <h1>Price</h1>
//                         </div>
//                         <div className='w-[30%] md:w-[16%]'>
//                             <h1>Status</h1>
//                         </div>
//                         <div className='w-[10%] md:w-[5%]'>
//                             <h1><FaUserLarge /></h1>
//                         </div>
//                     </div>
//                     {AllOrders.map((items, i) => (
//                         <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
//                             <div className='w-[3%]'>
//                                 <h1 className='text-center'>{i + 1}</h1> {/* This is the Sr. column */}
//                             </div>
//                             <div className='w-[40%] md:w-[22%]'>
//                                 {items.book && items.book._id ? (
//                                     <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
//                                         {items.book.title}
//                                     </Link>
//                                 ) : (
//                                     <span className='text-red-500'>No Book Info</span>
//                                 )}
//                             </div>
//                             <div className='w-0 md:w-[45%] hidden md:block'>
//                                 <h1 className=''>{items.book?.desc?.slice(0, 50)}...</h1>
//                             </div>
//                             <div className='w-[17%] md:w-[9%]'>
//                                 <h1>Rs. {items.book?.price}</h1>
//                             </div>
//                             <div className='w-[30%] md:w-[16%]'>
//                                 <h1 className='font-semibold'>
//                                     <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)} >
//                                         {items.status === "Order Placed" ? (
//                                             <div className='text-yellow-500'>{items.status}</div>
//                                         ) : items.status === "Canceled" ? (
//                                             <div className='text-red-500'>{items.status}</div>
//                                         ) : (
//                                             <div className='text-green-500'>{items.status}</div>
//                                         )}
//                                     </button>
//                                     <div className={`${Options === i ? "flex" : "hidden"}`}>
//                                         <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
//                                             {[
//                                                 "Order Placed",
//                                                 "Out for delivery",
//                                                 "Delivered",
//                                                 "Canceled",
//                                             ].map((statusItem, j) => (
//                                                 <option value={statusItem} key={j}>{statusItem}</option>
//                                             ))}
//                                         </select>
//                                         <button className='text-green-500 hover:text-pink-600 mx-2'
//                                             onClick={() => {
//                                                 setOptions(-1)
//                                                 submitChanges(i)
//                                             }}><FaCheck /></button>
//                                     </div>
//                                 </h1>
//                             </div>
//                             <div className='w-[10%] md:w-[5%]'>
//                                 <button className='text-xl hover:text-orange-500' onClick={() => {
//                                     setuserDiv("fixed");
//                                     setuserDivData(items.user)
//                                 }}>
//                                     <IoOpenOutline />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />)}
//         </>
//     )
// }

// export default AllOrders





=======
>>>>>>> b38785e597742122962a30f530ad549743115f38
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { IoOpenOutline } from 'react-icons/io5';
import { FaCheck, FaUserLarge } from 'react-icons/fa6';
import SeeUserData from './SeeUserData';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState([]);
    const [Values, setValues] = useState({ status: "" });
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState(null);
=======
import { IoCheckmarkCircleOutline, IoOpenOutline, IoClose } from 'react-icons/io5';
import { Card, CardContent, Typography, Button, Grid, Box, Select, MenuItem, FormControl, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState({});
    const [statusMap, setStatusMap] = useState({});
    const [updatedStatusMap, setUpdatedStatusMap] = useState({});
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
>>>>>>> b38785e597742122962a30f530ad549743115f38
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
<<<<<<< HEAD
    const [Options, setOptions] = useState(-1);
=======
>>>>>>> b38785e597742122962a30f530ad549743115f38

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
<<<<<<< HEAD
                const groupedOrders = groupOrdersByUser(response.data.data);
                setAllOrders(groupedOrders);
=======
                const groupedOrders = groupOrdersByUserAndBatch(response.data.data);
                setAllOrders(groupedOrders);
                const initialStatusMap = response.data.data.reduce((acc, order) => {
                    acc[order._id] = order.status;
                    return acc;
                }, {});
                setStatusMap(initialStatusMap);
                setUpdatedStatusMap(initialStatusMap);
>>>>>>> b38785e597742122962a30f530ad549743115f38
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetch();
    }, []);

<<<<<<< HEAD
    const groupOrdersByUser = (orders) => {
        return orders.reduce((acc, order) => {
            if (!acc[order.user._id]) {
                acc[order.user._id] = {
=======
    const groupOrdersByUserAndBatch = (orders) => {
        return orders.reduce((acc, order) => {
            if (!acc[order.user._id]) {
                acc[order.user._id] = {};
            }
            if (!acc[order.user._id][order.batchId]) {
                acc[order.user._id][order.batchId] = {
>>>>>>> b38785e597742122962a30f530ad549743115f38
                    user: order.user,
                    orders: [],
                    totalPrice: 0,
                };
            }
<<<<<<< HEAD
            acc[order.user._id].orders.push(order);
            acc[order.user._id].totalPrice += order.book.price;
=======
            acc[order.user._id][order.batchId].orders.push(order);
            acc[order.user._id][order.batchId].totalPrice += order.book.price * order.quantity;
>>>>>>> b38785e597742122962a30f530ad549743115f38
            return acc;
        }, {});
    };

<<<<<<< HEAD
    const change = (e) => {
        const { value } = e.target;
        setValues({ status: value });
    };

    const submitChanges = async (userId) => {
        const userOrders = AllOrders[userId].orders;
        try {
            for (const order of userOrders) {
                const response = await axios.put(`http://localhost:1000/api/v1/status/${order._id}`, Values, { headers });
                alert(response.data.message);
            }
=======
    const handleStatusChange = (batchId, status, userId) => {
        const batchOrders = AllOrders[userId][batchId].orders;
        const newUpdatedStatusMap = { ...updatedStatusMap };
        batchOrders.forEach(order => {
            newUpdatedStatusMap[order._id] = status;
        });
        setUpdatedStatusMap(newUpdatedStatusMap);
    };

    const submitChanges = async (userId, batchId) => {
        const batchOrders = AllOrders[userId][batchId].orders;
        try {
            await Promise.all(batchOrders.map(order => {
                const statusToUpdate = updatedStatusMap[order._id];
                return axios.put(`http://localhost:1000/api/v1/status/${order._id}`, { status: statusToUpdate }, { headers });
            }));
            alert('Status updated for all books in the order.');
            setStatusMap({ ...updatedStatusMap });
>>>>>>> b38785e597742122962a30f530ad549743115f38
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status. Please check the console for more details.');
        }
    };

<<<<<<< HEAD
    return (
        <>
            {!Object.keys(AllOrders).length && (
                <div className="h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {Object.keys(AllOrders).length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500'>All Orders</h1>
                    {Object.keys(AllOrders).map((userId, i) => (
                        <div key={userId} className="mb-8">
                            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                                <div className='w-[3%]'>
                                    <h1>{i + 1}</h1>
                                </div>
                                <div className='w-[50%] md:w-[22%]'>
                                    <h1>User: {AllOrders[userId].user.name}</h1>
                                </div>
                                <div className='w-[30%] md:w-[16%]'>
                                    <h1>Status</h1>
                                </div>
                                <div className='w-[10%] md:w-[5%]'>
                                    <h1>Total Price</h1>
                                </div>
                            </div>
                            {AllOrders[userId].orders.map((order, j) => (
                                <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={order._id}>
                                    <div className='w-[3%]'>
                                        <h1 className='text-center'>{j + 1}</h1>
                                    </div>
                                    <div className='w-[40%] md:w-[22%]'>
                                        {order.book && order.book._id ? (
                                            <Link to={`/view-book-details/${order.book._id}`} className='hover:text-blue-300'>
                                                {order.book.title}
                                            </Link>
                                        ) : (
                                            <span className='text-red-500'>No Book Info</span>
                                        )}
                                    </div>
                                    <div className='w-0 md:w-[45%] hidden md:block'>
                                        <h1 className=''>{order.book?.desc?.slice(0, 50)}...</h1>
                                    </div>
                                    <div className='w-[17%] md:w-[9%]'>
                                        <h1>Rs. {order.book?.price}</h1>
                                    </div>
                                    <div className='w-[30%] md:w-[16%]'>
                                        <h1 className='font-semibold'>
                                            {order.status === "Order Placed" ? (
                                                <div className='text-yellow-500'>{order.status}</div>
                                            ) : order.status === "Canceled" ? (
                                                <div className='text-red-500'>{order.status}</div>
                                            ) : (
                                                <div className='text-green-500'>{order.status}</div>
                                            )}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-between items-center mt-2'>
                                <div className='flex items-center gap-2'>
                                    <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
                                        {[
                                            "Order Placed",
                                            "Out for delivery",
                                            "Delivered",
                                            "Canceled",
                                        ].map((statusItem, j) => (
                                            <option value={statusItem} key={j}>{statusItem}</option>
                                        ))}
                                    </select>
                                    <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => submitChanges(userId)}><FaCheck /></button>
                                </div>
                                <div className='text-lg'>
                                    Total Price: Rs. {AllOrders[userId].totalPrice}
                                </div>
                                <button className='text-xl hover:text-orange-500' onClick={() => {
                                    setuserDiv("fixed");
                                    setuserDivData(AllOrders[userId].user)
                                }}>
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />)}
        </>
=======
    const getStatusStyle = (status) => {
        switch (status) {
            case "Order Placed":
                return { color: '#E5C454' }; // Vibrant yellow
            case "Out for delivery":
                return { color: '#E57254' }; // Vibrant blue
            case "Delivered":
                return { color: '#4CAF50' }; // Vibrant green
            case "Canceled":
                return { color: '#E94F64' }; // Vibrant red
            default:
                return { color: 'white' };
        }
    };

    const handleOpen = async (userId) => {
        try {
            console.log("Fetching user data for userId:", userId);
            const response = await axios.get(`http://localhost:1000/api/v1/get-user-information`, {
                headers: {
                    id: userId,
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log("User data fetched successfully:", response.data);
            setUserData(response.data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            alert('Failed to fetch user data.');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='bg-zinc-900 px-8 py-8 min-h-screen'>
            {!Object.keys(AllOrders).length ? (
                <Loader />
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>All Orders</h1>
                    </Grid>
                    {Object.keys(AllOrders).map((userId, i) => (
                        <Grid item xs={12} key={userId}>
                            {Object.keys(AllOrders[userId]).map((batchId) => (
                                <Card key={batchId} sx={{ mb: 3, backgroundColor: '#2E2E2E', color: 'white' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6" color="white">
                                                {AllOrders[userId][batchId].user.username}
                                            </Typography>
                                            <Typography variant="body1" color="lightgrey">
                                                Total Price: Rs. {AllOrders[userId][batchId].totalPrice}
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2}>
                                            {AllOrders[userId][batchId].orders.map((order, j) => (
                                                <Grid item xs={12} key={order._id}>
                                                    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="#3A3A3A" borderRadius={2}>
                                                        <Box display="flex" flexDirection="column">
                                                            <Typography variant="body1" color="white">
                                                                {j + 1}. Book:{" "}
                                                                {order.book && order.book._id ? (
                                                                    <Link to={`/view-book-details/${order.book._id}`} style={{ color: '#90caf9' }}>
                                                                        {order.book.title}
                                                                    </Link>
                                                                ) : (
                                                                    <span style={{ color: 'red' }}>No Book Info</span>
                                                                )}
                                                            </Typography>
                                                            <Typography variant="body2" color="lightgrey" mt={1}>
                                                                Quantity: {order.quantity} | Price per book: Rs. {order.book?.price}
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" alignItems="center">
                                                            <Typography variant="body2" sx={getStatusStyle(statusMap[order._id])} mr={2}>
                                                                {statusMap[order._id]}
                                                            </Typography>
                                                            <IconButton color="primary" onClick={() => handleOpen(AllOrders[userId][batchId].user._id)}>
                                                                <IoOpenOutline />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            ))}
                                            <Grid item xs={12}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="#3A3A3A" borderRadius={2}>
                                                    <FormControl variant="outlined" size="small">
                                                        <Select
                                                            value={updatedStatusMap[AllOrders[userId][batchId].orders[0]._id] || ""}
                                                            onChange={(e) => handleStatusChange(batchId, e.target.value, userId)}
                                                            sx={{ color: 'white', bgcolor: '#4A4A4A' }}
                                                        >
                                                            {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map((statusItem, j) => (
                                                                <MenuItem value={statusItem} key={j}>{statusItem}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => submitChanges(userId, batchId)}
                                                        startIcon={<IoCheckmarkCircleOutline />}
                                                    >
                                                        Update
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#1E1E1E', color: '#fff' }}>
                    <Typography variant="h5" fontWeight="bold">User Details</Typography>
                    <IconButton onClick={handleClose} sx={{ color: '#fff' }}>
                        <IoClose size={24} />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ bgcolor: '#2E2E2E', color: '#fff' }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Username</Typography>
                        <Typography variant="body1" sx={{ ml: 1, mt: 0.5 }}>{userData.username}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Email</Typography>
                        <Typography variant="body1" sx={{ ml: 1, mt: 0.5 }}>{userData.email}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Address</Typography>
                        <Typography variant="body1" sx={{ ml: 1, mt: 0.5 }}>{userData.address}</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
>>>>>>> b38785e597742122962a30f530ad549743115f38
    );
}

export default AllOrders;
