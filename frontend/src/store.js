import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productList, productDetail } from './reducers/Product';
import { addRemoveCart } from './reducers/Cart';
import { userLogin, userRegister, userProfile, userProfileEdit } from './reducers/User';
import { saveShippingAddress } from './reducers/Shipping';
import { savePaymentMethod } from './reducers/Payment';
import { orderGet, orderGetAll, orderPay, orderPlace } from './reducers/Order';

const reducer = combineReducers({
    productList: productList,
    productDetail: productDetail,
    cart: addRemoveCart,
    userLogin: userLogin,
    userRegister: userRegister,
    userProfile: userProfile,
    userProfileEdit: userProfileEdit,
    shipping: saveShippingAddress,
    payment: savePaymentMethod,
    orderPlace: orderPlace,
    orderGet: orderGet,
    orderGetAll: orderGetAll,
    orderPay: orderPay
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    },
    userLogin: {
        user: userFromStorage
    },
    shipping: {
        shippingAddress: shippingAddressFromStorage
    },
    payment: {
        paymentMethod: paymentMethodFromStorage
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

// To add one element in store, the flow is: create reducer -> add it to store -> create action