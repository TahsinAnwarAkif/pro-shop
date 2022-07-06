import express from 'express';
import { getProducts, getProductById, createProductReview, deleteProduct, createProduct, updateProduct, getTopProducts } from '../controllers/productController.js';
import { protect, protectFromNonAdmins } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

router.route('/').post(protect, protectFromNonAdmins, createProduct);
router.route('/:id').put(protect, protectFromNonAdmins, updateProduct);
router.route('/:id').delete(protect, protectFromNonAdmins, deleteProduct);

export default router;