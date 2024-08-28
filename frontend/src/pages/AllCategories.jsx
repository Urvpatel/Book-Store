import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, IconButton, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';
import UpdateCategories from './UpdateCategories';
import { CSSTransition } from 'react-transition-group';
import './FadeOut.css'; // Ensure you create this CSS file

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('success'); // Add a state for message type

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/v1/get-categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setShowUpdateForm(true);
    };

    const handleUpdateSuccess = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setShowMessage(true);
        setShowUpdateForm(false);
        fetchCategories();

        // Automatically hide the message after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" color="white" textAlign="center" gutterBottom>
                All Categories
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} key={category._id}>
                        <Paper sx={{ p: 2, backgroundColor: '#2e2e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h6" color="white">{category.name}</Typography>
                            </Box>
                            <IconButton onClick={() => handleEditClick(category)} color="primary">
                                <Edit sx={{ color: '#fff' }} />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {showUpdateForm && selectedCategory && (
                <UpdateCategories 
                    category={selectedCategory} 
                    onUpdateSuccess={handleUpdateSuccess} 
                    onCancel={() => setShowUpdateForm(false)}
                />
            )}

            <CSSTransition
                in={showMessage}
                timeout={500} // Smoother transition timing
                classNames="fade"
                unmountOnExit
            >
                <Box
                    sx={{
                        mt: 4,
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: messageType === 'success' ? '#4caf50' : '#FF0000', // Green for success, red for delete
                        color: '#fff',
                        borderRadius: 1,
                        transition: 'all 0.5s ease-in-out', // Smoother transition effect
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {message}
                    </Typography>
                </Box>
            </CSSTransition>
        </Container>
    );
};

export default AllCategories;
