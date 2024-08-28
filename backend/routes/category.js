const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../models/category');
const { authenticateToken } = require('./userAuth');
// const { authenticateToken } = require('../middleware/authMiddleware');

// Add a new category
// Add a new category
router.post('/add-category', authenticateToken, async (req, res) => {
    try {
        const { name, imageUrl } = req.body;

        if (!name || !imageUrl) {
            return res.status(400).json({ message: 'Name and Image URL are required' });
        }

        const category = new Category({ name, imageUrl });
        await category.save();
        res.status(200).json({ message: 'Category added successfully', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error: error.message });
    }
});


// Update a category
router.put('/update-category/:categoryId', authenticateToken, async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, imageUrl, subcategories } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ message: 'Category name already exists' });
            }
            category.name = name;
        }

        if (imageUrl) {
            category.imageUrl = imageUrl;
        }

        if (subcategories) {
            category.subcategories = subcategories;
        }

        await category.save();

        res.status(200).json({ message: 'Category updated successfully', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
});


router.post('/add-subcategory/:categoryId', authenticateToken, async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories.push({ name });
        await category.save();

        res.status(200).json({ message: 'Subcategory added successfully', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error adding subcategory', error: error.message });
    }
});

router.put('/update-subcategory/:categoryId/:subCategoryId', authenticateToken, async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;
        const { name } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subCategory = category.subcategories.id(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        subCategory.name = name;
        await category.save();

        res.status(200).json({ message: 'Subcategory updated successfully', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subcategory', error: error.message });
    }
});
// Delete a subcategory from a category
// Delete a subcategory from a category
router.delete('/delete-subcategory/:categoryId/:subCategoryId', authenticateToken, async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories.id(subCategoryId).remove();
        await category.save();

        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
    }
});


router.delete('/delete-category/:categoryId', authenticateToken, async (req, res) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
});
// Get all categories
router.get('/get-categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ status: 'success', data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});



module.exports = router;
