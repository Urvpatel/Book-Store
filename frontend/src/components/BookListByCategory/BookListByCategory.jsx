import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button } from '@mui/material';

const BookListByCategory = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryDetailsAndBooks = async () => {
            try {
                const categoryResponse = await axios.get(`http://localhost:1000/api/v1/get-categories`);
                const category = categoryResponse.data.data.find(cat => cat._id === categoryId);
                if (category) {
                    setCategoryName(category.name);
                    setSubCategories(category.subcategories || []);
                }

                const booksResponse = await axios.get(`http://localhost:1000/api/v1/books-by-category/${categoryId}`);
                setBooks(booksResponse.data.data);
            } catch (error) {
                console.error('Error fetching category details or books:', error);
            }
        };

        fetchCategoryDetailsAndBooks();
    }, [categoryId]);

    useEffect(() => {
        const fetchBooksBySubCategory = async () => {
            try {
                let response;
                if (selectedSubCategory) {
                    response = await axios.get(`http://localhost:1000/api/v1/books-by-category/${categoryId}/${selectedSubCategory}`);
                } else {
                    response = await axios.get(`http://localhost:1000/api/v1/books-by-category/${categoryId}`);
                }
                setBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books by subcategory:', error);
            }
        };

        fetchBooksBySubCategory();
    }, [selectedSubCategory, categoryId]);

    const handleSubCategoryClick = (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
    };

    const handleBookClick = (bookId) => {
        navigate(`/view-book-details/${bookId}`);
    };

    return (
        <div style={{ backgroundColor: '#000', minHeight: '150vh', margin: 0, padding: 0 }}>
            <Container maxWidth="lg" sx={{ backgroundColor: 'black', color: 'white', borderRadius: '8px', padding: '16px' }}>
                <Typography variant="h4" textAlign="center" gutterBottom>
                    {categoryName}
                </Typography>

                {subCategories.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
                        <Button
                            variant="text"
                            sx={{
                                m: 1,
                                color: !selectedSubCategory ? '#fbc02d' : 'white',
                                position: 'relative',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '2px',
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: '#fbc02d',
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'bottom right',
                                    transition: 'transform 0.25s ease-out',
                                },
                                '&:hover:after': {
                                    transform: 'scaleX(1)',
                                    transformOrigin: 'bottom left',
                                },
                            }}
                            onClick={() => setSelectedSubCategory(null)}
                        >
                            All
                        </Button>
                        {subCategories.map(sub => (
                            <Button
                                key={sub._id}
                                variant="text"
                                sx={{
                                    m: 1,
                                    color: selectedSubCategory === sub._id ? '#fbc02d' : 'white',
                                    position: 'relative',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '2px',
                                        bottom: 0,
                                        left: 0,
                                        backgroundColor: '#fbc02d',
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'bottom right',
                                        transition: 'transform 0.25s ease-out',
                                    },
                                    '&:hover:after': {
                                        transform: 'scaleX(1)',
                                        transformOrigin: 'bottom left',
                                    },
                                }}
                                onClick={() => handleSubCategoryClick(sub._id)}
                            >
                                {sub.name}
                            </Button>
                        ))}
                    </Box>
                )}

                <Grid container spacing={2}>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book._id}>
                                <Box
                                    sx={{
                                        padding: 2,
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                    onClick={() => handleBookClick(book._id)}
                                >
                                    <img 
                                        src={book.url} 
                                        alt={book.title} 
                                        style={{ width: '100%', height: '300px', objectFit: 'contain', borderRadius: '8px' }} 
                                    />
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#bbb' }}>
                                        {book.author}
                                    </Typography>
                                    {book.discount > 0 ? (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#fbc02d' }}>
                                                {book.discount}% OFF
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#bbb', textDecoration: 'line-through' }}>
                                                ₹{book.price}
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: '#fbc02d' }}>
                                                ₹{book.discountedPrice}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="h6" sx={{ mt: 2, color: '#fbc02d' }}>
                                            ₹{book.discountedPrice}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" textAlign="center" sx={{ mt: 2, width: '100%' }}>
                            No books found in this category or subcategory.
                        </Typography>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default BookListByCategory;
