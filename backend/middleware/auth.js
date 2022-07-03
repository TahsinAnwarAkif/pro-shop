import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import user from '../models/user.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await user.findById(decodedToken.id).select('-password');
            
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, Token Failed');
        }
    }
    
    if(!token){
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
});

export {protect};