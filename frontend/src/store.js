import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {productDetailsReducers, productListReducers} from "./reducers/ProductReducers";
import {CartReducers} from "./reducers/CartReducers";

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: CartReducers,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    }
};
const middleware = [thunk];


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
