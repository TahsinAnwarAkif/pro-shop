import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_EDIT_REQUEST,
    USER_PROFILE_EDIT_SUCCESS,
    USER_PROFILE_EDIT_FAIL,
    USER_PROFILE_RESET
    } from "../constants/User";
    
export const userLogin = (state = {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true};
        case USER_LOGIN_SUCCESS:
            return { loading: false, user: action.payload};
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const userRegister = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true};
        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload};
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userProfile = (state = {userDetail: {}}, action) => {
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true};
        case USER_PROFILE_SUCCESS:
            return { loading: false, userDetail: action.payload};
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload};
        case USER_PROFILE_RESET:
            return {};
        default:
            return state;
    }
}

export const userProfileEdit = (state = {userDetail: {}}, action) => {
    switch(action.type){
        case USER_PROFILE_EDIT_REQUEST:
            return { loading: true};
        case USER_PROFILE_EDIT_SUCCESS:
            return { loading: false, success: true, userDetail: action.payload};
        case USER_PROFILE_EDIT_FAIL:
           return { loading: false, error: action.payload};
        default:
           return state;
    }
}
