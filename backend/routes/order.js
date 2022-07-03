import express from 'express';
import { getOrderById, getOrders, placeOrder, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getOrders);
router.route('/').post(protect, placeOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;