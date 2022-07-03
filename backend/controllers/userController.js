import asyncHandler from 'express-async-handler';
import user from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// @ desc   Auth User & Get Token
// @ route  POST /api/users/login
// @ access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const fetchedUser = await user.findOne({email});
    
    if(fetchedUser && (await fetchedUser.matchPassword(password))){
        res.json({
            _id: fetchedUser._id,
            name:fetchedUser.name,
            email: fetchedUser.email,
            isAdmin: fetchedUser.isAdmin,
            token: generateToken(fetchedUser._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password!');
    }
});

// @ desc   Register a New User
// @ route  POST /api/users
// @ access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const fetchedUser = await user.findOne({email});
    
    if(fetchedUser){
        res.status(400);
        throw new Error('User already exists!');
    }
    
    const createdUser = await user.create({
        name,
        email,
        password
    });
    
    if(createdUser){
        res.status(201).json({
            _id: createdUser._id,
            name:createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid User Data!');
    }
});

// @ desc   Get User Profile
// @ route  GET /api/users/profile
// @ access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const fetchedUser = await user.findById(req.user._id);
    
    if(fetchedUser){
        res.json({
            _id: fetchedUser._id,
            name:fetchedUser.name,
            email: fetchedUser.email,
            isAdmin: fetchedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not Found');
    }
});

// @ desc   Edit User Profile
// @ route  PUT /api/users/profile
// @ access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const {id, name, email, password} = req.body;
    const fetchedUser = await user.findById(id);
    
    if(fetchedUser){
        fetchedUser.name = name || fetchedUser.name;
        
        if(email && fetchedUser.email !== email){
            const userWithSameEmail = await user.findOne({email});
            
            if(userWithSameEmail){
                res.status(400);
                throw new Error('User with same email already exists!'); 
            }

            fetchedUser.email = email;
        }
        
        if(password){
            fetchedUser.password = password;
        }
        
        const updatedUser = await fetchedUser.save();
        
        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    }else{
        res.status(404);
        throw new Error('User not Found');
    }
});


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}