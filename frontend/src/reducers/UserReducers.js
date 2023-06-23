import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/UserConstants";

export const userLoginReducers = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        // case 'PRODUCT_LIST_REQUEST':
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}