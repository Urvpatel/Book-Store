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





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { FaCheck, FaUserLarge } from 'react-icons/fa6';
import SeeUserData from './SeeUserData';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState([]);
    const [Values, setValues] = useState({ status: "" });
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState(null);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const [Options, setOptions] = useState(-1);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
                const groupedOrders = groupOrdersByUser(response.data.data);
                setAllOrders(groupedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetch();
    }, []);

    const groupOrdersByUser = (orders) => {
        return orders.reduce((acc, order) => {
            if (!acc[order.user._id]) {
                acc[order.user._id] = {
                    user: order.user,
                    orders: [],
                    totalPrice: 0,
                };
            }
            acc[order.user._id].orders.push(order);
            acc[order.user._id].totalPrice += order.book.price;
            return acc;
        }, {});
    };

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
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status. Please check the console for more details.');
        }
    };

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
    );
}

export default AllOrders;
