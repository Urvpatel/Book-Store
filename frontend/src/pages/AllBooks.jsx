import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import { Container, Typography, Box, Grid, Select, MenuItem } from '@mui/material';

function AllBooks() {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [sortOption, setSortOption] = useState('');
  const [alphabeticalSort, setAlphabeticalSort] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-book');
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    let filteredBooks = Data;

    if (searchTerm.trim() !== '') {
      filteredBooks = Data.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    applySort(filteredBooks);
  }, [location.search, Data]);

  useEffect(() => {
    applySort(filteredData);
  }, [sortOption, alphabeticalSort]);

  const applySort = (books) => {
    if (sortOption) {
      books = books.sort((a, b) => {
        const priceA = a.discount > 0 ? a.discountedPrice : a.price;
        const priceB = b.discount > 0 ? b.discountedPrice : b.price;

        return sortOption === 'low-to-high' ? priceA - priceB : priceB - priceA;
      });
    }

    if (alphabeticalSort) {
      books = books.sort((a, b) => {
        return alphabeticalSort === 'a-z'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
    }

    setFilteredData([...books]);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAlphabeticalSortChange = (e) => {
    setAlphabeticalSort(e.target.value);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '150vh', margin: 0, padding: 0 }}>
      <Container maxWidth="lg" sx={{ backgroundColor: 'black', color: 'white', borderRadius: '8px', padding: '16px' }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          All Books
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap', gap: '16px' }}>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            displayEmpty
            sx={{ minWidth: 200, backgroundColor: '#1e1e1e', color: 'white', '& .MuiSelect-icon': { color: '#fbc02d' } }}
          >
            <MenuItem value="">Sort by Price</MenuItem>
            <MenuItem value="low-to-high">Low to High</MenuItem>
            <MenuItem value="high-to-low">High to Low</MenuItem>
          </Select>

          <Select
            value={alphabeticalSort}
            onChange={handleAlphabeticalSortChange}
            displayEmpty
            sx={{ minWidth: 200, backgroundColor: '#1e1e1e', color: 'white', '& .MuiSelect-icon': { color: '#fbc02d' } }}
          >
            <MenuItem value="">Sort by Title</MenuItem>
            <MenuItem value="a-z">A-Z</MenuItem>
            <MenuItem value="z-a">Z-A</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {!filteredData.length && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Loader />
              </Box>
            </Grid>
          )}
          {filteredData.map((items, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
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
              >
                <BookCard data={items} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllBooks;
