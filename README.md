# ProShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

This project is created while finishing this course: [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course

![screenshot](https://github.com/TahsinAnwarAkif/pro-shop/blob/master/uploads/proshop.JPG)

## Features

- Fully Featured Shopping Cart
- Product Reviews and Ratings
- Top Products Carousel
- Product Pagination
- Product Search
- User Profile with Orders
- Admin Product Management
- Admin User management
- Admin Order Management
- Checkout Process (Shipping, Payment method, etc)
- PayPal / Credit Card Integration
- Database Seeder (Products & Users)
- Server Deployment Support (Heroku)

### Env Variables

To run the app locally, create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your_mongodb_uri>
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = <your_paypal_client_id>
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

Heroku postbuild script is attached also, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
