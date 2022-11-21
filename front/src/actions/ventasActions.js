import axios from "axios";

import {
  ALL_VENTAS_REQUEST,
  ALL_VENTAS_SUCCESS,
  ALL_VENTAS_FAIL,
  ALL_CART_REQUEST,
  ALL_CART_SUCCESS,
  ALL_CART_FAIL,
  CART_ITEM_REQUEST,
  CART_ITEM_SUCCESS,
  CART_ITEM_FAIL,
  EDIT_CART_REQUEST,
  EDIT_CART_SUCCESS,
  EDIT_CART_FAIL,
  NEW_VENTAS_REQUEST,
  NEW_VENTAS_SUCCESS,
  NEW_VENTAS_FAIL,
  DEL_CART_REQUEST,
  DEL_CART_SUCCESS,
  DEL_CART_FAIL,
  CLEAR_ERRORS
} from '../constants/ventasConstants';

export const getVentas = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_VENTAS_REQUEST });

    const { data } = await axios.get("api/ventas");

    dispatch({
      type: ALL_VENTAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_VENTAS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postVentas = (body) => async (dispatch) => {
  try {
    dispatch({type: NEW_VENTAS_REQUEST})
    
    const {data} = await axios.post(`/api/ventas`, body)

      dispatch({
          type:NEW_VENTAS_SUCCESS,
          payload: data.product
      })
  }catch (error){
      dispatch({
          type:NEW_VENTAS_FAIL,
          payload: error.response.data.message
      })
  }
}

export const getProductsCart = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CART_REQUEST });

    const { data } = await axios.get("/api/products-cart");

    dispatch({
      type: ALL_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postProductsCart = (body) => async (dispatch) => {
  try {
    dispatch({ type: CART_ITEM_REQUEST });

    const { data } = await axios.post("/api/products-cart", body);
    dispatch({
      type: CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editItemToCart = (id, query, amount) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_CART_REQUEST });
    let nombre;
    if (query === "del" && amount === 1) {
      nombre = await axios.delete(`/api/products-cart/${id}`);
    } else {
      nombre = await axios.put(`/api/products-cart/${id}?query=${query}`, {
        amount,
      });
    }
    const { data } = nombre;
    getProductsCart();
    dispatch({
      type: EDIT_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const delProductsCart = () => async (dispatch) => {
  try {
    dispatch({ type: DEL_CART_REQUEST });

    const { data } = await axios.delete("/api/products-cart");
    dispatch({
      type: DEL_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEL_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear error in dispatch

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}