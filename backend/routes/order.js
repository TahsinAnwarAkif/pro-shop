import express from 'express';
import { getOrderById, getOrderByIdAndUserId, getOrders, getOrdersByUserId, placeOrder, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js';
import { protect, protectFromNonAdmins } from '../middleware/auth.js';

const router = express.Router();

router.route('/myorders').get(protect, getOrdersByUserId);
router.route('/').post(protect, placeOrder);
router.route('/myorders/:id').get(protect, getOrderByIdAndUserId);
router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/').get(protect, protectFromNonAdmins, getOrders);
router.route('/:id').get(protect, protectFromNonAdmins, getOrderById);
router.route('/:id/deliver').put(protect, protectFromNonAdmins, updateOrderToDelivered);

export default router;