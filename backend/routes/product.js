import express from 'express';
import asyncHandler from 'express-async-handler';
import product from '../models/product.js';

const router = express.Router();

// @ desc   Fetch all Products
// @ route  GET /api/products
// @ access Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await product.find({});
    
    res.json(products);
}));

// @ desc   Fetch Single Product
// @ route  GET /api/products/:id
// @ access Public
router.get('/:id', asyncHandler(async (req, res) => {
    const fetchedProduct = await product.findById(req.params.id);
    
    if(fetchedProduct){
        res.json(fetchedProduct);
    }else{
        res.status(404);        
        
        throw new Error('Product not found');
    }
}));

export default router;