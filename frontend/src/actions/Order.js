import axios from "axios";
import { 
    ORDER_PLACE_REQUEST,
    ORDER_PLACE_SUCCESS,
    ORDER_PLACE_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_GET_ALL_REQUEST,
    ORDER_GET_ALL_SUCCESS,
    ORDER_GET_ALL_FAIL,
    ORDER_GET_ALL_REQUEST_ADMIN,
    ORDER_GET_ALL_SUCCESS_ADMIN,
    ORDER_GET_ALL_FAIL_ADMIN,
    ORDER_DELIVER_REQUEST_ADMIN,
    ORDER_DELIVER_SUCCESS_ADMIN,
    ORDER_DELIVER_FAIL_ADMIN
} from "../constants/Order";

export const placeOrder = (order) => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_PLACE_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.post('/api/orders', order, config);
        
        dispatch({
            type: ORDER_PLACE_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_PLACE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getOrder = (id) => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_GET_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        let api = '';

        if(user.isAdmin){
            api = `/api/orders/${id}`;
        }else{
            api = `/api/orders/myorders/${id}`;
        }
        
        const { data } = await axios.get(api, config);
        
        dispatch({
            type: ORDER_GET_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getOrdersByUserId = () => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_GET_ALL_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.get(`/api/orders/myorders`, config);
        
        dispatch({
            type: ORDER_GET_ALL_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_GET_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_PAY_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getAllOrders = () => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_GET_ALL_REQUEST_ADMIN});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.get(`/api/orders`, config);
        
        dispatch({
            type: ORDER_GET_ALL_SUCCESS_ADMIN,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_GET_ALL_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
    try{       
        dispatch({type: ORDER_DELIVER_REQUEST_ADMIN});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
        
        dispatch({
            type: ORDER_DELIVER_SUCCESS_ADMIN,
            payload: data
        });
    }catch(error){
        dispatch({
            type: ORDER_DELIVER_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
