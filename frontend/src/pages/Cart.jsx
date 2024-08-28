import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, IconButton, Box, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Cart = () => {
    const navigate = useNavigate();
    const [Cart, setCart] = useState([]);
    const [Total, setTotal] = useState(0);
    const [user, setUser] = useState({}); // Initialize as an empty object

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers });
                const cartData = response.data.data.map(item => ({
                    ...item,
                    quantity: 1,
                    price: parseFloat(item.price) || 0,
                }));
                setCart(cartData);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/get-user-information', { headers });
                setUser(response.data); // Make sure this matches your API structure
            } catch (error) {
                console.error("Error fetching user details:", error.response ? error.response.data : error.message);
                alert("Failed to fetch user details. Please try again.");
            }
        };

        fetchCart();
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (Cart && Cart.length > 0) {
            let total = 0;
            Cart.forEach((item) => {
                const price = item.discount && item.discount > 0 ? item.discountedPrice : item.price;
                total += price * item.quantity;
            });
            setTotal(total);
        }
    }, [Cart]);

    const deleteItem = async (bookid) => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/delete-book-from-cart/${bookid}`, {}, { headers });
            alert(response.data.message);
            setCart(Cart.filter(item => item._id !== bookid));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleQuantityChange = async (bookid, newQuantity) => {
        try {
            const bookResponse = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${bookid}`);
            const availableQuantity = bookResponse.data.data.quantity;

            if (newQuantity > availableQuantity) {
                alert("Not enough books!");
                return;
            }

            if (newQuantity < 1) {
                newQuantity = 1;
            }

            setCart(
                Cart.map((item) =>
                    item._id === bookid ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error("Error changing quantity:", error);
        }
    };

    const PlaceOrder = async () => {
        try {
            const orderItems = Cart.map(item => ({
                bookId: item._id,
                quantity: item.quantity,
            }));

            const response = await axios.post('http://localhost:1000/api/v1/place-order', { order: orderItems }, { headers });

            if (response.status === 200) {
                alert(response.data.message);
                navigate('/profile/orderHistory');
            }

            await Promise.all(
                Cart.map(async (item) => {
                    await axios.put(`http://localhost:1000/api/v1/update-book/${item._id}`, {
                        quantity: item.quantity
                    }, { headers });
                })
            );
        } catch (error) {
            console.error("Error placing order:", error);
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message || 'An unexpected error occurred';
            alert(`Error placing order: ${errorMessage}`);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Invoice", 105, 20, null, null, "center");

        doc.setFontSize(12);
        doc.text(`Name: ${user.username || 'N/A'}`, 14, 40);
        doc.text(`Email: ${user.email || 'N/A'}`, 14, 48);
        doc.text(`Address: ${user.address || 'N/A'}`, 14, 56);

        const tableColumn = ["Title", "Author", "Quantity", "Price", "Total"];
        const tableRows = [];

        Cart.forEach(item => {
            const price = item.discount && item.discount > 0 ? item.discountedPrice : item.price;
            const itemData = [
                item.title,
                item.author,
                item.quantity,
                `Rs. ${price.toFixed(2)}`,
                `Rs. ${(price * item.quantity).toFixed(2)}`
            ];
            tableRows.push(itemData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 70 });

        const gst = (Total * 0.1).toFixed(2);
        const finalTotal = (parseFloat(Total) + parseFloat(gst)).toFixed(2);

        doc.text(`Subtotal: Rs. ${Total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
        doc.text(`GST (10%): Rs. ${gst}`, 14, doc.autoTable.previous.finalY + 16);
        doc.text(`Total: Rs. ${finalTotal}`, 14, doc.autoTable.previous.finalY + 22);

        doc.save("invoice.pdf");
    };

    return (
        <div className='bg-zinc-900 px-4 md:px-12 min-h-screen flex flex-col'>
            {!Cart && (
                <div className='w-full h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>
            )}
            {Cart.length === 0 && (
                <div className="h-screen">
                    <div className='h-[100%] flex items-center justify-center flex-col'>
                        <h1 className='text-3xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
                        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty cart" className='lg:h-[50vh]' />
                    </div>
                </div>
            )}
            {Cart.length > 0 && (
                <>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>Your Cart</h1>
                    <Grid container spacing={2}>
                        {Cart.map((item, i) => (
                            <Grid item xs={12} key={i}>
                                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, backgroundColor: '#333', flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <Link to={`/view-book-details/${item._id}`}>
                                        <img src={item.url} alt="/" style={{ height: '150px', objectFit: 'cover', marginRight: { xs: '0', sm: '16px' }, marginBottom: { xs: '16px', sm: '0' } }} />
                                    </Link>
                                    <CardContent sx={{ flex: '1', minWidth: 0 }}>
                                        <Link to={`/view-book-details/${item._id}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="h5" color="white" sx={{ wordWrap: 'break-word' }}>{item.title}</Typography>
                                        </Link>
                                        <Typography variant="body2" color="gray">{item.desc.slice(0, 100)}...</Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                                        <IconButton onClick={() => handleQuantityChange(item._id, item.quantity - 1)} color="primary">
                                            <Remove />
                                        </IconButton>
                                        <TextField
                                            variant="outlined"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                            inputProps={{
                                                min: 1,
                                                style: { textAlign: 'center', color: 'white', MozAppearance: 'textfield', WebkitAppearance: 'none' },
                                            }}
                                            sx={{
                                                width: '60px',
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'gray',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'lightgray',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                },
                                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                },
                                                '& input[type=number]': {
                                                    MozAppearance: 'textfield',
                                                },
                                            }}
                                        />
                                        <IconButton onClick={() => handleQuantityChange(item._id, item.quantity + 1)} color="primary">
                                            <Add />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h6" color="white" sx={{ marginRight: '16px', width: '150px', textAlign: 'right', marginTop: { xs: '16px', sm: '0' } }}>
                                        {item.discount && item.discount > 0 ? (
                                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                                <Typography variant="body2" color="Darkgray" sx={{ textDecoration: 'line-through', marginRight: '8px', fontSize: '0.9rem' }}>
                                                    Rs. {item.price}
                                                </Typography>
                                                <Typography variant="h6" color="danger" sx={{ fontWeight: 'bold' }}>
                                                    Rs. {item.discountedPrice * item.quantity}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <>Rs. {item.price * item.quantity}</>
                                        )}
                                    </Typography>

                                    <IconButton onClick={() => deleteItem(item._id)} color="error" sx={{ marginTop: { xs: '16px', sm: '0' } }}>
                                        <AiFillDelete />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
            {Cart && Cart.length > 0 && (
                <div className='mt-8 w-full flex items-center justify-end flex-grow'>
                    <div className='p-4 bg-zinc-800 rounded w-full md:w-auto'>
                        <Typography variant="h4" color="white" fontWeight="bold">Invoice</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" color="white">Name: {user.username || 'N/A'}</Typography>
                            <Typography variant="body1" color="white">Email: {user.email || 'N/A'}</Typography>
                            <Typography variant="body1" color="white">Address: {user.address || 'N/A'}</Typography>
                        </Box>
                        <div className='mt-3'>
                            <Typography variant="body1" color="gray">Subtotal: Rs. {Total.toFixed(2)}</Typography>
                            <Typography variant="body1" color="gray">GST (10%): Rs. {(Total * 0.1).toFixed(2)}</Typography>
                            <Typography variant="h6" color="white" fontWeight="bold">Total Amount: Rs. {(Total * 1.1).toFixed(2)}</Typography>
                        </div>
                        <div className='w-full mt-3'>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: '#e0e0e0', color: '#000', '&:hover': { backgroundColor: '#d4d4d4' } }}
                                onClick={generatePDF}
                            >
                                Download Invoice as PDF
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: '#e0e0e0', color: '#000', '&:hover': { backgroundColor: '#d4d4d4' }, mt: 2 }}
                                onClick={PlaceOrder}
                            >
                                Place Your Order
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
