import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Container, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AddCategories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImageUrl, setCategoryImageUrl] = useState(''); // New state for image URL
    const [subCategoryName, setSubCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

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

    const handleCategoryChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleCategoryImageUrlChange = (e) => {
        setCategoryImageUrl(e.target.value); // Handle image URL input change
    };

    const handleSubCategoryChange = (e) => {
        setSubCategoryName(e.target.value);
    };

    const handleCategorySelect = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const response = await axios.post('http://localhost:1000/api/v1/add-category', { name: categoryName, imageUrl: categoryImageUrl }, { headers });
            setMessage(response.data.message);
            setCategoryName(''); // Clear the input field after submission
            setCategoryImageUrl(''); // Clear the image URL field after submission
        } catch (error) {
            setMessage(error.response.data.message || "Error adding category");
        }
    };

    const handleSubCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const response = await axios.post(`http://localhost:1000/api/v1/add-subcategory/${selectedCategory}`, { name: subCategoryName }, { headers });
            setMessage(response.data.message);
            setSubCategoryName(''); // Clear the input field after submission
        } catch (error) {
            setMessage(error.response.data.message || "Error adding subcategory");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, p: 3, backgroundColor: '#2e2e2e', borderRadius: 2 }}>
            <Typography variant="h4" color="white" textAlign="center" gutterBottom>
                Add a New Category
            </Typography>
            <form onSubmit={handleCategorySubmit}>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Category Name"
                        value={categoryName}
                        onChange={handleCategoryChange}
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
                        label="Category Image URL"
                        value={categoryImageUrl}
                        onChange={handleCategoryImageUrlChange}
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
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                    >
                        Add Category
                    </Button>
                </Box>
            </form>

            <Typography variant="h4" color="white" textAlign="center" gutterBottom sx={{ mt: 5 }}>
                Add a Subcategory
            </Typography>
            <form onSubmit={handleSubCategorySubmit}>
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
                        label="Subcategory Name"
                        value={subCategoryName}
                        onChange={handleSubCategoryChange}
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
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                    >
                        Add Subcategory
                    </Button>
                </Box>
            </form>

            {message && (
                <Typography variant="body1" color="white" textAlign="center" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Container>
    );
};

export default AddCategories;
