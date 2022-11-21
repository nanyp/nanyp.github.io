import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productReducer, productDetailsReducer} from './reducer/productReducer';
import { cartReducer, ventaReducer } from "./reducer/ventasReducer";
import { authReducer } from './reducer/userReducer';

const reducer = combineReducers({
  products:productReducer,
  productDetails: productDetailsReducer,
  ventas:ventaReducer,
  productsCart:cartReducer,
  auth: authReducer
});

let initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
