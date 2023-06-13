import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {productDetailsReducers, productListReducers} from "./products/ProductReducers";

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
});

const initialState = {};
const middleware = [thunk];


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
