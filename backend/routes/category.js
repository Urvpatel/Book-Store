const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../models/category');
const { authenticateToken } = require('./userAuth');

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
        const { name, imageUrl } = req.body;

        // Find the category by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if the name needs to be updated and if it is unique
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ message: 'Category name already exists' });
            }
            category.name = name; // Update the name
        }

        // Update the image URL if provided
        if (imageUrl) {
            category.imageUrl = imageUrl;
        }

        // Save the updated category
        await category.save();

        res.status(200).json({ message: 'Category updated successfully', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
});

// Add a subcategory to an existing category
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
        res.status(200).json({ message: 'Subcategory added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding subcategory', error: error.message });
    }
});

// Get all categories with subcategories
router.get('/get-categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ status: 'success', data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});

module.exports = router;
