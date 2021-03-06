import axios from "axios";
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM 
} from "../constants/Cart";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    try{
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: qty
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(error){
        dispatch({
            type: CART_ADD_ITEM,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
        try{
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(error){
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}