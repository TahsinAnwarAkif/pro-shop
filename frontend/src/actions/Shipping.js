import { 
    SHIPPING_ADDRESS_SAVE_REQUEST,
    SHIPPING_ADDRESS_SAVE_SUCCESS,
    SHIPPING_ADDRESS_SAVE_FAIL
} from "../constants/Shipping";

export const saveShippingAddress = (data) => async (dispatch) => {
    try{       
        dispatch({type: SHIPPING_ADDRESS_SAVE_REQUEST});

        localStorage.setItem('shippingAddress', JSON.stringify(data));

        dispatch({
            type: SHIPPING_ADDRESS_SAVE_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: SHIPPING_ADDRESS_SAVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};