import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from '@mui/material';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const descriptionLimit = 500; // Limit description to 150 characters

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching the book data:", error);
            }
        };
        fetchData();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-fav", {}, { headers });
        alert(response.data.message);
    };

    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers });
        alert(response.data.message);
    };

    const deleteBook = async () => {
        const response = await axios.delete(`http://localhost:1000/api/v1/delete-book`, { headers });
        alert(response.data.message);
        navigate("/all-books");
    };

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    return (
        <>
            {Data && (
                <Box sx={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 8, padding: { xs: 2, md: 6 }, paddingBottom: 8 }}>
                    <Box sx={{ flex: 1, padding: 4, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={Data.url} alt="Book cover" style={{ height: '70vh', borderRadius: '8px' }} />
                        {isLoggedIn && role === "user" && (
                            <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleFavourite}
                                    sx={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <FaHeart />
                                    <Typography sx={{ marginLeft: 2, display: { xs: 'block', lg: 'none' } }}>Favourites</Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCart}
                                    sx={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    disabled={Data.quantity === 0}
                                >
                                    <FaShoppingCart />
                                    <Typography sx={{ marginLeft: 2, display: { xs: 'block', lg: 'none' } }}>Add to Cart</Typography>
                                </Button>
                            </Box>
                        )}
                        {isLoggedIn && role === "admin" && (
                            <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
                                <Link to={`/updateBook/${id}`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <FaEdit />
                                        <Typography sx={{ marginLeft: 2, display: { xs: 'block', lg: 'none' } }}>Edit</Typography>
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={deleteBook}
                                    sx={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <MdDeleteOutline />
                                    <Typography sx={{ marginLeft: 2, display: { xs: 'block', lg: 'none' } }}>Delete</Typography>
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ flex: 1, padding: 4, backgroundColor: '#1e1e1e', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', marginBottom: 2 }}>
                            {Data.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#bbb', marginBottom: 4 }}>
                            by {Data.author}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#bbb', marginBottom: 4 }}>
                            {showFullDescription || Data.desc.length <= descriptionLimit
                                ? Data.desc
                                : `${Data.desc.substring(0, descriptionLimit)}...`}
                            {Data.desc.length > descriptionLimit && (
                                <Button
                                    onClick={toggleDescription}
                                    sx={{ color: '#2196f3', fontWeight: 'bold', marginLeft: 1 }}
                                >
                                    {showFullDescription ? 'Show Less' : 'Read More'}
                                </Button>
                            )}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#bbb', marginBottom: 4, display: 'flex', alignItems: 'center' }}>
                            <GrLanguage style={{ marginRight: 8 }} /> {Data.language}
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', marginBottom: 4 }}>
                            {Data.discount && Data.discount > 0 ? (
                                <>
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        sx={{ textDecoration: 'line-through', color: '#ff1744', marginRight: 2 }}
                                    >
                                        ₹{Data.price}
                                    </Typography>
                                    <Typography variant="body1" component="span" sx={{ color: '#fbc02d' }}>
                                        ₹{Data.discountedPrice}
                                    </Typography>
                                </>
                            ) : (
                                <>Price : ₹{Data.price}</>
                            )}
                        </Typography>
                        {Data.quantity === 0 ? (
                            <Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold', marginTop: 4 }}>
                                Out of Stock!
                            </Typography>
                        ) : (
                            Data.quantity <= 5 && (
                                <Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold', marginTop: 4 }}>
                                    Only few left!
                                </Typography>
                            )
                        )}
                    </Box>
                </Box>
            )}
            {!Data && (
                <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                    <Loader />
                </Box>
            )}
        </>
    );
};

export default ViewBookDetails;
