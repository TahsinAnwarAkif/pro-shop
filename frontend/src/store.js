import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productList, productDetail } from './reducers/Product';
import { addRemoveCart } from './reducers/Cart';

const reducer = combineReducers({
    productList: productList,
    productDetail: productDetail,
    cart: addRemoveCart
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

// To add one element in store, the flow is: create reducer -> add it to store -> create action