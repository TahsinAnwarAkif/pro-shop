import axios from "axios";
import { CART_ITEM_RESET } from "../constants/Cart";
import { ORDER_GET_ALL_RESET } from "../constants/Order";
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_LIST_RESET } from "../constants/Product";
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_PROFILE_EDIT_FAIL,
    USER_PROFILE_EDIT_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_EDIT_REQUEST,
    USER_PROFILE_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS, 
    USER_PROFILE_RESET,
    USER_LIST_REQUEST_ADMIN,
    USER_LIST_SUCCESS_ADMIN,
    USER_LIST_FAIL_ADMIN,
    USER_LIST_RESET_ADMIN,
    USER_DELETE_REQUEST_ADMIN,
    USER_DELETE_SUCCESS_ADMIN,
    USER_DELETE_FAIL_ADMIN
} from "../constants/User";

export const userLogin = (email, password) => async (dispatch) => {
    try{       
        dispatch({type: USER_LOGIN_REQUEST});
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/users/login', {email, password}, config);
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        
        localStorage.setItem('user', JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userLogout = () => async(dispatch) => {
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      
      dispatch({type: USER_LOGOUT});
      dispatch({type: ORDER_GET_ALL_RESET});
      dispatch({type: USER_PROFILE_RESET});
      dispatch({type: CART_ITEM_RESET});
      dispatch({type: USER_LIST_RESET_ADMIN});
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
};

export const userRegister = (name, email, password) => async (dispatch) => {
    try{       
        dispatch({type: USER_REGISTER_REQUEST});
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/users', {name, email, password}, config);
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        
        localStorage.setItem('user', JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userProfile = (id) => async (dispatch, getState) => {
    try{       
        dispatch({type: USER_PROFILE_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const { data } = await axios.get(`/api/users/${id}`, config);
        
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userProfileEdit = (id, userToBeEdited) => async (dispatch, getState) => {
    try{       
        dispatch({type: USER_PROFILE_EDIT_REQUEST});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.put(`/api/users/${id}`, userToBeEdited, config);
        
        dispatch({
            type: USER_PROFILE_EDIT_SUCCESS,
            payload: data
        });

        if(id === user._id || id === 'profile'){
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
          });
        
          localStorage.setItem('user', JSON.stringify(data));    
        }
    }catch(error){
        dispatch({
            type: USER_PROFILE_EDIT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try{       
        dispatch({type: USER_LIST_REQUEST_ADMIN});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.get(`/api/users`, config);
        
        dispatch({
            type: USER_LIST_SUCCESS_ADMIN,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_LIST_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try{       
        dispatch({type: USER_DELETE_REQUEST_ADMIN});

        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.delete(`/api/users/${id}`, config);
        
        dispatch({
            type: USER_DELETE_SUCCESS_ADMIN,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_DELETE_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
