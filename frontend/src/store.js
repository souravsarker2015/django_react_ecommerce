import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {productDetailsReducers, productListReducers} from "./reducers/ProductReducers";
import {CartReducers} from "./reducers/CartReducers";
import {userDetailsReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers} from "./reducers/UserReducers";

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: CartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: {
        userInfo: userInfoFromStorage,
    }
};
const middleware = [thunk];


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
