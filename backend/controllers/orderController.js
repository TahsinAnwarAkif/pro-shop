import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @ desc   Place Order
// @ route  POST /api/orders
// @ access Private
const placeOrder = asyncHandler(async (req, res) => {
    const {
           orderItems, 
           shippingAddress,
           paymentMethod,
           itemPrice,
           taxPrice,
           shippingPrice,
           totalPrice
        } = req.body;

    if(orderItems && orderItems.length == 0){
        res.status(400);
        throw new Error('No Order Items!');
    }else{
        const newOrder = new Order({
           user: req.user._id,
           orderItems, 
           shippingAddress,
           paymentMethod,
           itemPrice,
           taxPrice,
           shippingPrice,
           totalPrice
        });

        const createdOrder = await newOrder.save();

        res.status(201).json(createdOrder);
    }
});

// @ desc   Get Order
// @ route  GET /api/orders/:id
// @ access Private
const getOrderById = asyncHandler(async (req, res) => {
    const fetchedOrder = await Order.find({
        _id: req.params.id,
        user: req.user._id
    })
    .populate('user', 'name email');

    if(!fetchedOrder || fetchedOrder.length === 0){
        res.status(404);
        throw new Error('Order not Found');
    }else{
        res.status(200).json(fetchedOrder[0]);
    }
});

// @ desc   Get Orders by logged in user
// @ route  GET /api/orders
// @ access Private
const getOrders = asyncHandler(async (req, res) => {
    const fetchedOrders = await Order.find({
        user: req.user._id
    })
    .populate('user', 'name email');

    res.status(200).json(fetchedOrders);
});

// @ desc   Update Order to Paid
// @ route  PUT /api/orders/:id/pay
// @ access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const fetchedOrder = await Order.find({
        _id: req.params.id,
        user: req.user._id
    })
    .populate('user', 'name email');

    console.log('fetchedOrder');
    console.log(fetchedOrder);

    if(!fetchedOrder || fetchedOrder.length === 0){
        res.status(404);
        throw new Error('Order not Found');
    }else{
        fetchedOrder[0].isPaid = true;
        fetchedOrder[0].paidAt = Date.now();
        fetchedOrder[0].paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = fetchedOrder[0].save();

        res.status(201).json(updatedOrder);
    }
});

export {placeOrder, getOrderById, getOrders, updateOrderToPaid};