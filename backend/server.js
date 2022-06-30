import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import product from './routes/product.js';
import {notFound, errorHandler} from './middleware/error.js'

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.use('/api/products', product);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline));