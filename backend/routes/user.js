import express from 'express';
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, getUser, deleteUser, updateUser } from '../controllers/userController.js';
import { protect, protectFromNonAdmins } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

router.route('/').get(protect, protectFromNonAdmins, getUsers);
router.route('/:id').get(protect, protectFromNonAdmins, getUser);
router.route('/:id').put(protect, protectFromNonAdmins, updateUser);
router.route('/:id').delete(protect, protectFromNonAdmins, deleteUser);

export default router;