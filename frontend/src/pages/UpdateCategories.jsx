import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';

const UpdateCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/get-categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySelect = (e) => {
        const selected = categories.find(cat => cat._id === e.target.value);
        setSelectedCategory(selected._id);
        setCategoryName(selected.name);
        setImageUrl(selected.imageUrl);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const response = await axios.put(`http://localhost:1000/api/v1/update-category/${selectedCategory}`, 
            { name: categoryName, imageUrl }, { headers });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, p: 3, backgroundColor: '#2e2e2e', borderRadius: 2 }}>
            <Typography variant="h4" color="white" textAlign="center" gutterBottom>
                Update Category
            </Typography>
            <form onSubmit={handleUpdateSubmit}>
                <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'white' }}>Select Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategorySelect}
                            sx={{
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiSelect-icon': {
                                    color: 'white',
                                },
                                '& .MuiSelect-select': {
                                    color: 'white',
                                    '&:focus': {
                                        backgroundColor: 'transparent',
                                    },
                                },
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white' },
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }
                        }}
                    />
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white' },
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }
                        }}
                    />
                </Box>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Update Category'}
                    </Button>
                </Box>
                {message && (
                    <Typography variant="body1" color="white" textAlign="center" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default UpdateCategories;
