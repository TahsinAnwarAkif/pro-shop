import { 
    PAYMENT_SAVE_REQUEST,
    PAYMENT_SAVE_SUCCESS,
    PAYMENT_SAVE_FAIL
} from "../constants/Payment";

export const savePaymentMethod = (state = {paymentMethod: {}}, action) => {
    switch(action.type){
        case PAYMENT_SAVE_REQUEST:
            return {...state, loading: true};
        case PAYMENT_SAVE_SUCCESS:
            return { loading: false, paymentMethod: action.payload};
        case PAYMENT_SAVE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}
