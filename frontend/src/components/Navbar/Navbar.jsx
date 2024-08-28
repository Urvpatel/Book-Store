import React, { useEffect, useState, useRef } from 'react';
import { FaGripLines, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    const links = [
        { title: 'Home', link: '/' },
        { title: 'All Books', link: '/all-books' },
        ...(isLoggedIn && role !== "admin" ? [{ title: 'Cart', link: '/cart' }] : []),
        { title: 'Profile', link: '/profile' },
        { title: 'Admin Profile', link: '/profile' },
    ];

    if (!isLoggedIn) {
        links.splice(2, 2);
    }
    if (isLoggedIn && role === "user") {
        links.splice(4, 1);
    }
    if (isLoggedIn && role === "admin") {
        links.splice(3, 1);
    }

    const [MobileNav, setMobileNav] = useState('hidden');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const suggestionsRef = useRef();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                try {
                    const response = await axios.get(`http://localhost:1000/api/v1/search-books?q=${searchTerm}`);
                    setSuggestions(response.data.data);
                    setShowSuggestions(true);
                    setHighlightedIndex(-1);
                } catch (error) {
                    console.error("Error fetching search suggestions:", error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        fetchSuggestions();
    }, [searchTerm]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            const selectedBook = suggestions[highlightedIndex];
            navigate(`/view-book-details/${selectedBook._id}`);
            setSearchTerm('');
            setShowSuggestions(false);
        }
    };

    const handleSearchClick = () => {
        navigate(`/all-books?search=${searchTerm}`);
        setSearchTerm('');
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (bookId) => {
        navigate(`/view-book-details/${bookId}`);
        setSearchTerm('');
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (suggestionsRef.current && highlightedIndex >= 0) {
            const highlightedItem = suggestionsRef.current.children[highlightedIndex];
            highlightedItem.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    return (
        <>
            <nav className='relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50 flex-wrap'>
                <Link to='/' className='flex items-center'>
                    <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                    <h1 className='text-2xl font-semibold whitespace-nowrap'>BookHeaven</h1>
                </Link>

                <div className='relative flex-1 md:flex md:flex-wrap md:justify-end md:items-center gap-4 hidden'>
                    {/* Search Bar */}
                    <div className='relative'>
                        <input
                            type="text"
                            className='bg-zinc-700 text-white px-4 py-2 rounded-l outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder="Search books or authors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-r' onClick={handleSearchClick}>
                            <FaSearch />
                        </button>
                        {showSuggestions && (
                            <div ref={suggestionsRef} className='absolute left-0 right-0 bg-white text-black z-10 rounded shadow-lg max-h-60 overflow-auto'>
                                {suggestions.map((book, index) => (
                                    <div
                                        key={book._id}
                                        className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onMouseDown={() => handleSuggestionClick(book._id)}
                                    >
                                        {book.title} <span className='text-sm text-gray-500'>by {book.author}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {links.map((items, i) => (
                        <div className='flex items-center' key={i}>
                            {items.title === "Profile" || items.title === "Admin Profile" ? (
                                <Link to={items.link} className='px-4 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>{items.title}</Link>
                            ) : (
                                <Link to={items.link} className='hover:text-blue-500 transition-all duration-300 whitespace-nowrap'>{items.title}</Link>
                            )}
                        </div>
                    ))}

                    {isLoggedIn === false && (
                        <div className='flex gap-4'>
                            <Link to='/Login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>Login</Link>
                            <Link to='/Signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-500 transition-all duration-300'>SignUp</Link>
                        </div>
                    )}
                </div>

                <button
                    className='block md:hidden text-white text-2xl hover:text-zinc-400'
                    onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
                >
                    <FaGripLines />
                </button>
            </nav>

            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className={`${MobileNav} text-white text-4xl mb-7 font-semibold hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={() => setMobileNav("hidden")}
                    >
                        {items.title}
                    </Link>
                ))}

                {isLoggedIn === false && (
                    <>
                        <Link to='/Login' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
                        <Link to='/Signup' className={`${MobileNav} px-5 mb-7 text-3xl font-semibold py-2 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
