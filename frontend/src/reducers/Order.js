import { 
    ORDER_PLACE_REQUEST,
    ORDER_PLACE_SUCCESS,
    ORDER_PLACE_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_GET_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_GET_ALL_REQUEST,
    ORDER_GET_ALL_SUCCESS,
    ORDER_GET_ALL_FAIL,
    ORDER_GET_ALL_RESET,
    ORDER_GET_ALL_REQUEST_ADMIN,
    ORDER_GET_ALL_SUCCESS_ADMIN,
    ORDER_GET_ALL_FAIL_ADMIN,
    ORDER_GET_ALL_RESET_ADMIN,
    ORDER_DELIVER_REQUEST_ADMIN,
    ORDER_DELIVER_SUCCESS_ADMIN,
    ORDER_DELIVER_FAIL_ADMIN,
    ORDER_DELIVER_RESET_ADMIN
} from "../constants/Order";

export const orderPlace = (state = {}, action) => {
    switch(action.type){
        case ORDER_PLACE_REQUEST:
            return { loading: true};
        case ORDER_PLACE_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case ORDER_PLACE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

export const orderGet = (state = {loading: true}, action) => {
    switch(action.type){
        case ORDER_GET_REQUEST:
            return { ...state, loading: true};
        case ORDER_GET_SUCCESS:
            return { loading: false, order: action.payload};
        case ORDER_GET_FAIL:
            return { loading: false, error: action.payload};
        case ORDER_GET_RESET:
            return {};
        default:
            return state;
    }
}

export const orderGetAllByUserId = (state = {loading: true, orders: []}, action) => {
    switch(action.type){
        case ORDER_GET_ALL_REQUEST:
            return { ...state, loading: true};
        case ORDER_GET_ALL_SUCCESS:
            return { loading: false, orders: action.payload};
        case ORDER_GET_ALL_FAIL:
            return { loading: false, error: action.payload};
        case ORDER_GET_ALL_RESET:
            return {};
        default:
            return state;
    }
}

export const orderGetAll = (state = {loading: true, orders: []}, action) => {
    switch(action.type){
        case ORDER_GET_ALL_REQUEST_ADMIN:
            return { ...state, loading: true};
        case ORDER_GET_ALL_SUCCESS_ADMIN:
            return { loading: false, orders: action.payload};
        case ORDER_GET_ALL_FAIL_ADMIN:
            return { loading: false, error: action.payload};
        case ORDER_GET_ALL_RESET_ADMIN:
            return {};
        default:
            return state;
    }
}

export const orderPay = (state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return { ...state, loading: true};
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true};
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload};
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDeliver = (state = {}, action) => {
    switch(action.type){
        case ORDER_DELIVER_REQUEST_ADMIN:
            return { ...state, loading: true};
        case ORDER_DELIVER_SUCCESS_ADMIN:
            return { loading: false, success: true};
        case ORDER_DELIVER_FAIL_ADMIN:
            return { loading: false, error: action.payload};
        case ORDER_DELIVER_RESET_ADMIN:
            return {};
        default:
            return state;
    }
}
