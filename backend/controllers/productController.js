import asyncHandler from 'express-async-handler';
import product from '../models/product.js';

// @ desc   Fetch all Products
// @ route  GET /api/products
// @ access Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 5;
    
    const pageNo = Number(req.query.pageNo) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};
    
    const count = await product.countDocuments({...keyword});
    const products = await product.find({...keyword}).limit(pageSize).skip(pageSize * (pageNo - 1));

    res.json({
        products,
        pages: Math.ceil(count / pageSize)
    });
});

// @ desc   Fetch Top Rated Products
// @ route  GET /api/products/top
// @ access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await product.find({}).sort({rating: -1}).limit(3);

    res.json({products});
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

// @ desc   Delete Product
// @ route  DELETE /api/products/:id
// @ access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const fetchedProduct = await product.findById(req.params.id);
    
    if(fetchedProduct){
        await fetchedProduct.remove();
        res.status(201).json({message: 'Product removed'});    
    }else{
        res.status(404);
        throw new Error('Product not Found');
    }
});

// @ desc   Create Product
// @ route  POST /api/products
// @ access Private
const createProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;
    
    const createdProduct = await product.create({
        name: name,
        price: price,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock,
        description: description,
        user: req.user._id
    });
    
    res.status(201).json({
        product: createdProduct,
        created: true,
        updated: false
    });
});

// @ desc   Update Product
// @ route  PUT /api/products/:id
// @ access Private
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;
    const fetchedProduct = await product.findById(req.params.id);
    
    if(fetchedProduct){
        fetchedProduct.name = name || fetchedProduct.name;
        fetchedProduct.price = price || fetchedProduct.price;
        fetchedProduct.description = description || fetchedProduct.description;
        fetchedProduct.image = image || fetchedProduct.image;
        fetchedProduct.brand = brand || fetchedProduct.brand;
        fetchedProduct.category = category || fetchedProduct.category;
        fetchedProduct.countInStock = countInStock || fetchedProduct.countInStock;
        
        const updatedProduct = await fetchedProduct.save();
        res.status(201).json({
            product: updatedProduct,
            created: false,
            updated: true
        });
    }else{
        res.status(404);
        throw new Error("Product Not Found");
    }
});

// @ desc   Create New Review
// @ route  POST /api/products/:id/reviews
// @ access Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const fetchedProduct = await product.findById(req.params.id);
    
    if(fetchedProduct){
        const alreadyReviewed = fetchedProduct.reviews.find(r => r.user._id.equals(req.user._id));
        
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }
        
        fetchedProduct.reviews.push(review);
        fetchedProduct.numReviews = fetchedProduct.reviews.length;
        
        fetchedProduct.rating = fetchedProduct.reviews.reduce((acc, item) => item.rating + acc, 0) 
        / fetchedProduct.reviews.length;
        
        await fetchedProduct.save();
        res.status(201).json({
            message: 'Review added'
        });
    }else{
        res.status(404);
        throw new Error("Product Not Found");
    }
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}