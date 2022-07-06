import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';
import connectDB from './config/db.js';
import product from './routes/product.js';
import user from './routes/user.js';
import order from './routes/order.js';
import upload from './routes/upload.js';
import {notFound, errorHandler} from './middleware/error.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', product);
app.use('/api/users', user);
app.use('/api/orders', order);
app.use('/api/upload', upload);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')));      
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}else{
  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    res.send('Server is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline));