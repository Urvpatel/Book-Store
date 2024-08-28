import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UpdateCategories = ({ category, onUpdateSuccess, onCancel }) => {
    const [categoryName, setCategoryName] = useState(category.name);
    const [imageUrl, setImageUrl] = useState(category.imageUrl);
    const [loading, setLoading] = useState(false);
    const [subCategories, setSubCategories] = useState(category.subcategories || []);
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openDeleteSubDialog, setOpenDeleteSubDialog] = useState(false);
    const [openUpdateSubDialog, setOpenUpdateSubDialog] = useState(false);

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
            setImageUrl(category.imageUrl);
            setSubCategories(category.subcategories || []);
        }
    }, [category]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            await axios.put(`http://localhost:1000/api/v1/update-category/${category._id}`, 
            { name: categoryName, imageUrl, subcategories: subCategories }, { headers });
            onUpdateSuccess(`${categoryName} updated successfully`); // Pass the success message to the parent
        } catch (error) {
            console.error("Error updating category:", error);
        } finally {
            setLoading(false);
            setOpenUpdateDialog(false);
        }
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            await axios.delete(`http://localhost:1000/api/v1/delete-category/${category._id}`, { headers });
            onUpdateSuccess(`${categoryName} deleted successfully`); // Pass the success message to the parent
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setLoading(false);
            setOpenDeleteDialog(false);
        }
    };

    const handleAddSubCategory = async () => {
        if (newSubCategoryName.trim() !== '') {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.post(
                    `http://localhost:1000/api/v1/add-subcategory/${category._id}`,
                    { name: newSubCategoryName },
                    { headers }
                );

                setSubCategories([...subCategories, { _id: response.data.data._id, name: newSubCategoryName }]);
                setNewSubCategoryName('');
                onUpdateSuccess(`${newSubCategoryName} subcategory added successfully`, 'success');
            } catch (error) {
                console.error("Error adding subcategory:", error);
            }
        }
    };

    const handleEditSubCategory = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setOpenUpdateSubDialog(true);
    };

    const handleUpdateSubCategory = async () => {
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            await axios.put(
                `http://localhost:1000/api/v1/update-subcategory/${category._id}/${selectedSubCategory._id}`,
                { name: selectedSubCategory.name },
                { headers }
            );

            setSubCategories(subCategories.map(sub => sub._id === selectedSubCategory._id ? selectedSubCategory : sub));
            setOpenUpdateSubDialog(false);
            onUpdateSuccess(`${selectedSubCategory.name} subcategory updated successfully`, 'success');
        } catch (error) {
            console.error("Error updating subcategory:", error);
        }
    };

    const handleDeleteSubCategory = async () => {
        setLoading(true);
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            await axios.delete(
                `http://localhost:1000/api/v1/delete-subcategory/${category._id}/${selectedSubCategory._id}`,
                { headers }
            );
    
            setSubCategories(subCategories.filter(sub => sub._id !== selectedSubCategory._id));
            setOpenDeleteSubDialog(false);
            onUpdateSuccess(`${selectedSubCategory.name} subcategory deleted successfully`, 'error');
        } catch (error) {
            console.error("Error deleting subcategory:", error.response ? error.response.data : error.message);
            alert(`Failed to delete subcategory: ${error.response ? error.response.data.message : error.message}`);
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

                {/* Subcategories Section */}
                <Typography variant="h6" color="white" sx={{ mb: 2 }}>
                    Subcategories
                </Typography>
                <List>
                    {subCategories.map((sub, index) => (
                        <ListItem key={index} sx={{ backgroundColor: '#424242', borderRadius: 1, mb: 1 }}>
                            <ListItemText primary={sub.name} sx={{ color: 'white' }} />
                            <IconButton color="primary" onClick={() => handleEditSubCategory(sub)}>
                                <Edit sx={{ color: '#fff' }} />
                            </IconButton>
                            <IconButton color="error" onClick={() => {
                                setSelectedSubCategory(sub);
                                setOpenDeleteSubDialog(true);
                            }}>
                                <Delete sx={{ color: '#fff' }} />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="New Subcategory Name"
                        value={newSubCategoryName}
                        onChange={(e) => setNewSubCategoryName(e.target.value)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ ml: 2 }}
                        onClick={handleAddSubCategory}
                    >
                        Add
                    </Button>
                </Box>

                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                        onClick={() => setOpenUpdateDialog(true)}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Update Category'}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 2 }}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => setOpenDeleteDialog(true)}
                    >
                        Delete Category
                    </Button>
                </Box>
            </form>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>{"Delete Category"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete this category?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCategory} color="error" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Update Confirmation Dialog */}
            <Dialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
            >
                <DialogTitle>{"Update Category"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update this category?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateSubmit} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Subcategory Confirmation Dialog */}
            <Dialog
                open={openDeleteSubDialog}
                onClose={() => setOpenDeleteSubDialog(false)}
            >
                <DialogTitle>{"Delete Subcategory"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete this subcategory?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteSubDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteSubCategory} color="error" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Update Subcategory Dialog */}
            <Dialog
                open={openUpdateSubDialog}
                onClose={() => setOpenUpdateSubDialog(false)}
            >
                <DialogTitle>{"Update Subcategory"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Subcategory Name"
                        value={selectedSubCategory?.name || ''}
                        onChange={(e) => setSelectedSubCategory({ ...selectedSubCategory, name: e.target.value })}
                        InputLabelProps={{ style: { color: 'black' } }}
                        InputProps={{
                            style: { color: 'black' },
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateSubDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateSubCategory} color="primary" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UpdateCategories;
