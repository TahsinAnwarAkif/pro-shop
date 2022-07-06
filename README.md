# ProShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.
> Live URL: https://proshop-9999.herokuapp.com/

![screenshot](https://github.com/TahsinAnwarAkif/pro-shop/blob/master/uploads/proshop.JPG)

## User's Functionalities:

- Register/Login
- Add products to their own cart
- Check them out with shipping address and payment info
- Place the order, pay for the order using PayPal/credit card
- Update their own profile and see their orders' details only
- Review/Rate a product once only in order to avoid BOT/spam reviews

## Admin's Functionalities:

- Login
- Perform all that a user can perform
- Create/Update/Delete a product
- Update/Delete a user
- Mark a user to be an admin user
- See all users' orders' details
- Mark the delivered orders as delivered

## Additional Functionalities:

- Top Products Carousel
- Product Pagination
- Product Search
- Database Seeder (Products & Users)
- Prevent NoSQL injections
- Add extra headers for security
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public (for now)
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
