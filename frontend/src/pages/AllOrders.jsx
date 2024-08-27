import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoOpenOutline, IoClose } from 'react-icons/io5';
import { Card, CardContent, Typography, Button, Grid, Box, Select, MenuItem, FormControl, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState({});
    const [statusMap, setStatusMap] = useState({});
    const [updatedStatusMap, setUpdatedStatusMap] = useState({});
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-all-order`, { headers });
                const groupedOrders = groupOrdersByUserAndBatch(response.data.data);
                setAllOrders(groupedOrders);
                const initialStatusMap = response.data.data.reduce((acc, order) => {
                    acc[order._id] = order.status;
                    return acc;
                }, {});
                setStatusMap(initialStatusMap);
                setUpdatedStatusMap(initialStatusMap);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetch();
    }, []);

    const groupOrdersByUserAndBatch = (orders) => {
        return orders.reduce((acc, order) => {
            if (!acc[order.user._id]) {
                acc[order.user._id] = {};
            }
            if (!acc[order.user._id][order.batchId]) {
                acc[order.user._id][order.batchId] = {
                    user: order.user,
                    orders: [],
                    totalPrice: 0,
                };
            }
            acc[order.user._id][order.batchId].orders.push(order);
            acc[order.user._id][order.batchId].totalPrice += order.book.price * order.quantity;
            return acc;
        }, {});
    };

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
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status. Please check the console for more details.');
        }
    };

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
    );
}

export default AllOrders;
