import React, { useState } from 'react'
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)
    const links = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'All Books',
            link: '/all-books'
        },
        ...(isLoggedIn && role !== "admin" ? [{
            title: 'Cart',
            link: '/cart'
        }] : []),
        {
            title: 'Profile',
            link: '/profile'
        },
        {
            title: 'Admin Profile',
            link: '/profile'
        },
    ];
    
    if (isLoggedIn === false) {
        links.splice(2, 2)
    }
    if (isLoggedIn === true && role === "user") {
        links.splice(4, 1)
    }
    if (isLoggedIn === true && role === "admin") {
        links.splice(3, 1)
    }

    const [MobileNav, setMobileNav] = useState('hidden')
    return (
        <>
            <nav className='relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50'>
                <Link to='/' className='flex items-center'>
                    <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                    <h1 className='text-2xl font-semibold'>BookHeaven</h1>
                </Link>

                <div className='nav-links-bookheaven block md:flex items-center gap-4'>
                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) => (
                            <div className='flex items-center' key={i}>
                                {items.title === "Profile" || items.title === "Admin Profile" ? (
                                    <Link to={items.link} className='px-4 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>{items.title}</Link>
                                ) : (
                                    <Link to={items.link} className='hover:text-blue-500 transition-all duration-300'>{items.title}</Link>
                                )}
                            </div>
                        ))}




                        {isLoggedIn === false && (<div className='hidden md:flex gap-4'><Link to='/Login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>Login</Link>
                            <Link to='/Signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>SignUp</Link></div>)}
                        <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}><FaGripLines /></button>
                    </div>
                </div>
            </nav >
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link to={items.link} className={`${MobileNav} text-white text-4xl mb-7 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}
                    >
                        {items.title}{''}</Link>))}
            </div>

            <Link to='/Login' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
            <Link to='/Signup' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
            {isLoggedIn === false && (<div className='hidden md:flex gap-4'><Link to='/Login' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
                <Link to='/Signup' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link></div>)}

        </>

    )

}

export default Navbar




// import React, { useState, useEffect } from 'react';
// import { FaGripLines } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { authActions } from '../../store/auth'; // Ensure this is correctly imported

// const Navbar = () => {
//     const dispatch = useDispatch();

//     // Retrieve auth state from Redux
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     const role = useSelector((state) => state.auth.role);
//     const [MobileNav, setMobileNav] = useState('hidden');

//     // Initialize auth state on component mount
//     useEffect(() => {
//         const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
//         const storedRole = localStorage.getItem('role');

//         if (storedIsLoggedIn && storedRole) {
//             dispatch(authActions.setLogin({ isLoggedIn: storedIsLoggedIn, role: storedRole }));
//         }
//     }, [dispatch]);

//     // Handle link visibility based on login status and role
//     const getLinks = () => {
//         const baseLinks = [
//             { title: 'Home', link: '/' },
//             { title: 'All Books', link: '/all-books' },
//         ];

//         if (isLoggedIn) {
//             if (role !== 'admin') {
//                 baseLinks.push({ title: 'Cart', link: '/cart' });
//             }
//             if (role === 'user') {
//                 baseLinks.push({ title: 'Profile', link: '/profile' });
//             } else if (role === 'admin') {
//                 baseLinks.push({ title: 'Admin Profile', link: '/profile' });
//             }
//         }

//         return baseLinks;
//     };

//     const links = getLinks();

//     return (
//         <>
//             <nav className='relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50'>
//                 <Link to='/' className='flex items-center'>
//                     <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
//                     <h1 className='text-2xl font-semibold'>BookHeaven</h1>
//                 </Link>

//                 <div className='nav-links-bookheaven block md:flex items-center gap-4'>
//                     <div className='hidden md:flex gap-4'>
//                         {links.map((items, i) => (
//                             <div className='flex items-center' key={i}>
//                                 <Link to={items.link} className={`px-4 py-1 ${items.title.includes("Profile") ? "border-blue-500 rounded hover:bg-white hover:text-zinc-800" : "hover:text-blue-500"} transition-all duration-300`}>
//                                     {items.title}
//                                 </Link>
//                             </div>
//                         ))}

//                         {!isLoggedIn && (
//                             <>
//                                 <Link to='/Login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>Login</Link>
//                                 <Link to='/Signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>SignUp</Link>
//                             </>
//                         )}

//                         <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
//                             <FaGripLines />
//                         </button>
//                     </div>
//                 </div>
//             </nav >

//             <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
//                 {links.map((items, i) => (
//                     <Link
//                         to={items.link}
//                         className='text-white text-4xl mb-7 font-semibold hover:text-blue-500 transition-all duration-300'
//                         key={i}
//                         onClick={() => setMobileNav("hidden")}
//                     >
//                         {items.title}
//                     </Link>
//                 ))}

//                 {!isLoggedIn && (
//                     <>
//                         <Link to='/Login' className='px-5 mb-7 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
//                         <Link to='/Signup' className='px-5 mb-7 text-3xl font-semibold py-2 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Navbar;






// import React, { useState } from 'react'
// import { FaGripLines } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const links = [
//         {
//             title: 'Home',
//             link: '/'
//         },
//         {
//             title: 'All Books',
//             link: '/all-books'
//         },
//         {
//             title: 'Cart',
//             link: '/cart'
//         },
//         {
//             title: 'Profile',
//             link: '/profile'
//         },
//         {
//             title: 'Admin Profile',
//             link: '/profile'
//         },
//     ];
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     const role = useSelector((state) => state.auth.role);

//     if (isLoggedIn === false) {
//         links.splice(2, 2);
//     }
//     if (isLoggedIn === true && role === "user") {
//         links.splice(4, 1);
//     }
//     if (isLoggedIn === true && role === "admin") {
//         links.splice(3, 1);
//     }

//     const [MobileNav, setMobileNav] = useState('hidden');

//     return (
//         <>
//             <nav className='relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50'>
//                 <Link to='/' className='flex items-center'>
//                     <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
//                     <h1 className='text-2xl font-semibold'>BookHeaven</h1>
//                 </Link>

//                 <div className='nav-links-bookheaven hidden md:flex items-center gap-4'>
//                     {links.map((items, i) => (
//                         <div className='flex items-center' key={i}>
//                             {items.title === "Profile" || items.title === "Admin Profile" ? (
//                                 <Link to={items.link} className='px-4 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>{items.title}</Link>
//                             ) : (
//                                 <Link to={items.link} className='hover:text-blue-500 transition-all duration-300'>{items.title}</Link>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <div className="md:hidden">
//                     <button className='text-white text-2xl hover:text-zinc-400' onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
//                         <FaGripLines />
//                     </button>
//                 </div>
//             </nav>

//             {/* Mobile Menu */}
//             <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center md:hidden`}>
//                 {links.map((items, i) => (
//                     <Link to={items.link} className="text-white text-4xl mb-7 font-semibold hover:text-blue-500 transition-all duration-300"
//                         key={i}
//                         onClick={() => setMobileNav("hidden")}>
//                         {items.title}
//                     </Link>
//                 ))}

//                 {isLoggedIn === false && (
//                     <div className="flex flex-col gap-4">
//                         <Link to='/Login' className="px-5 mb-7 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Login</Link>
//                         <Link to='/Signup' className="px-5 mb-7 text-3xl font-semibold py-2 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Navbar;
