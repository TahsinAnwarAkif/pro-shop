import { 
    SHIPPING_ADDRESS_SAVE_REQUEST,
    SHIPPING_ADDRESS_SAVE_SUCCESS,
    SHIPPING_ADDRESS_SAVE_FAIL
} from "../constants/Shipping";

export const saveShippingAddress = (state = {shippingAddress: {}}, action) => {
    switch(action.type){
        case SHIPPING_ADDRESS_SAVE_REQUEST:
            return {...state, loading: true};
        case SHIPPING_ADDRESS_SAVE_SUCCESS:
            return { loading: false, shippingAddress: action.payload};
        case SHIPPING_ADDRESS_SAVE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}
