import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productList, productDetail, productDelete, productCreateUpdate, productCreateReview, topRatedProductList } from './reducers/Product';
import { addRemoveCart } from './reducers/Cart';
import { userLogin, userRegister, userProfile, userProfileEdit, userList, userDelete } from './reducers/User';
import { saveShippingAddress } from './reducers/Shipping';
import { savePaymentMethod } from './reducers/Payment';
import { orderDeliver, orderGet, orderGetAll, orderGetAllByUserId, orderPay, orderPlace } from './reducers/Order';

const reducer = combineReducers({
    productList: productList,
    topRatedProductList: topRatedProductList,
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
    orderGetAllByUserId: orderGetAllByUserId,
    orderGetAll: orderGetAll,
    orderPay: orderPay,
    userList: userList,
    userDelete: userDelete,
    productDelete: productDelete,
    productCreateUpdate: productCreateUpdate,
    orderDeliver: orderDeliver,
    productCreateReview: productCreateReview
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
    userRegister: {
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