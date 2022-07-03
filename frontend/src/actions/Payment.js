import { 
    PAYMENT_SAVE_REQUEST,
    PAYMENT_SAVE_SUCCESS,
    PAYMENT_SAVE_FAIL
} from "../constants/Payment";

export const savePaymentMethod = (data) => async (dispatch) => {
    try{       
        dispatch({type: PAYMENT_SAVE_REQUEST});

        localStorage.setItem('paymentMethod', data);

        dispatch({
            type: PAYMENT_SAVE_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PAYMENT_SAVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};