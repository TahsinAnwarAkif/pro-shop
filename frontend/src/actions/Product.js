import axios from "axios";
import { PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_REQUEST_ADMIN,
    PRODUCT_DELETE_SUCCESS_ADMIN,
    PRODUCT_DELETE_FAIL_ADMIN,
    PRODUCT_CREATE_UPDATE_REQUEST_ADMIN,
    PRODUCT_CREATE_UPDATE_SUCCESS_ADMIN,
    PRODUCT_CREATE_UPDATE_FAIL_ADMIN,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_RATED_LIST_REQUEST,
    PRODUCT_TOP_RATED_LIST_SUCCESS,
    PRODUCT_TOP_RATED_LIST_FAIL
} from "../constants/Product";

export const listProducts = (keyword = '', pageNo = '') => async (dispatch) => {
    try{       
        dispatch({type: PRODUCT_LIST_REQUEST});
        
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNo=${pageNo}`);
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listTopRatedProducts = () => async (dispatch) => {
    try{       
        dispatch({type: PRODUCT_TOP_RATED_LIST_REQUEST});
        
        const { data } = await axios.get('/api/products/top');
        
        dispatch({
            type: PRODUCT_TOP_RATED_LIST_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_TOP_RATED_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getProductDetail = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST});
        const { data } = await axios.get(`/api/products/${id}`);
        
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try{       
        dispatch({type: PRODUCT_DELETE_REQUEST_ADMIN});
        
        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        const { data } = await axios.delete(`/api/products/${id}`, config);
        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS_ADMIN,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createUpdateProduct = (id, product) => async (dispatch, getState) => {
    try{       
        dispatch({type: PRODUCT_CREATE_UPDATE_REQUEST_ADMIN});
        
        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        let payload = {};

        if(id === 'create'){
          const { data } = await axios.post(`/api/products`, product, config);    
          payload = data;
        }else{
          const { data } = await axios.put(`/api/products/${id}`, product, config);
          payload = data;
        }
        
        dispatch({
            type: PRODUCT_CREATE_UPDATE_SUCCESS_ADMIN,
            payload: payload
        });
    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_UPDATE_FAIL_ADMIN,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createReview = (id, review) => async (dispatch, getState) => {
    try{       
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});
        
        const {userLogin: {user}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const { data } = await axios.post(`/api/products/${id}/reviews`, review, config);
        
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
