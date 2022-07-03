import asyncHandler from 'express-async-handler';
import product from '../models/product.js';

// @ desc   Fetch all Products
// @ route  GET /api/products
// @ access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await product.find({});
    
    res.json(products);
});

// @ desc   Fetch all Products
// @ route  GET /api/products
// @ access Public
const getProductById = asyncHandler(async (req, res) => {
    const fetchedProduct = await product.findById(req.params.id);
    
    if(fetchedProduct){
        res.json(fetchedProduct);
    }else{
        res.status(404);        
        
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById
}