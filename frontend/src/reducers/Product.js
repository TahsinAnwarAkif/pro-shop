import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL, 
    PRODUCT_DETAIL_RESET,
    PRODUCT_DELETE_REQUEST_ADMIN,
    PRODUCT_DELETE_SUCCESS_ADMIN,
    PRODUCT_DELETE_FAIL_ADMIN,
    PRODUCT_LIST_RESET,
    PRODUCT_CREATE_UPDATE_REQUEST_ADMIN,
    PRODUCT_CREATE_UPDATE_SUCCESS_ADMIN,
    PRODUCT_CREATE_UPDATE_FAIL_ADMIN,
    PRODUCT_CREATE_UPDATE_RESET_ADMIN,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_RATED_LIST_REQUEST,
    PRODUCT_TOP_RATED_LIST_SUCCESS,
    PRODUCT_TOP_RATED_LIST_FAIL,
    PRODUCT_TOP_RATED_LIST_RESET} from "../constants/Product";

export const productList = (state = {products : []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload};
        case PRODUCT_LIST_RESET:
            return {products: []};
        default:
            return state;
    }
}

export const topRatedProductList = (state = {products : []}, action) => {
    switch(action.type){
        case PRODUCT_TOP_RATED_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_TOP_RATED_LIST_SUCCESS:
            return { loading: false, products: action.payload.products};
        case PRODUCT_TOP_RATED_LIST_FAIL:
            return { loading: false, error: action.payload};
        case PRODUCT_TOP_RATED_LIST_RESET:
            return {products: []};
        default:
            return state;
    }
}

export const productDetail = (state = {product : {reviews: []}}, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, ...state};
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload};
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload};
        case PRODUCT_DETAIL_RESET:
            return {};
        default:
            return state;
    }
}

export const productDelete = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST_ADMIN:
            return { loading: true};
        case PRODUCT_DELETE_SUCCESS_ADMIN:
            return { loading: false, success: true};
        case PRODUCT_DELETE_FAIL_ADMIN:
           return { loading: false, success: false, error: action.payload};
        default:
           return state;
    }
}

export const productCreateUpdate = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_UPDATE_REQUEST_ADMIN:
            return { loading: true};
        case PRODUCT_CREATE_UPDATE_SUCCESS_ADMIN:
            return { loading: false, actionResult: action.payload, success: true};
        case PRODUCT_CREATE_UPDATE_FAIL_ADMIN:
           return { loading: false, error: action.payload};
        case PRODUCT_CREATE_UPDATE_RESET_ADMIN:
            return {};
        default:
           return state;
    }
}

export const productCreateReview = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true};
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, actionResult: action.payload, success: true};
        case PRODUCT_CREATE_REVIEW_FAIL:
           return { loading: false, error: action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
           return state;
    }
}
