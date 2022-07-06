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
    USER_PROFILE_RESET,
    USER_LIST_REQUEST_ADMIN,
    USER_LIST_SUCCESS_ADMIN,
    USER_LIST_FAIL_ADMIN,
    USER_LIST_RESET_ADMIN,
    USER_DELETE_REQUEST_ADMIN,
    USER_DELETE_SUCCESS_ADMIN,
    USER_DELETE_FAIL_ADMIN
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

export const userProfile = (state = {}, action) => {
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {loading: true};
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

export const userList = (state = {users: []}, action) => {
    switch(action.type){
        case USER_LIST_REQUEST_ADMIN:
            return { loading: true};
        case USER_LIST_SUCCESS_ADMIN:
            return { loading: false, users: action.payload};
        case USER_LIST_FAIL_ADMIN:
           return { loading: false, error: action.payload};
        case USER_LIST_RESET_ADMIN:
            return {users: []};
        default:
           return state;
    }
}

export const userDelete = (state = {}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST_ADMIN:
            return { loading: true};
        case USER_DELETE_SUCCESS_ADMIN:
            return { loading: false, success: true};
        case USER_DELETE_FAIL_ADMIN:
           return { loading: false, success: false, error: action.payload};
        default:
           return state;
    }
}
