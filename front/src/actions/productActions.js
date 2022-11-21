import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_NEW_REQUEST,
  PRODUCT_NEW_SUCCESS,
  PRODUCT_NEW_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from '../constants/productConstants';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST })

    // let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

    const { data } = await axios.get("api/products")

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}

// Detail by product
export const getProductDetails = (id) => async(dispatch)=>{
  try {
      dispatch({type: PRODUCT_DETAILS_REQUEST})

      const {data} = await axios.get(`/api/product/${id}`)

      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload: data.product
      })
  }catch (error){
      dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message
      })
  }
}

// Metodo POST
export const postProductDetails = (body) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_NEW_REQUEST})
    
    const {data} = await axios.post(`/api/product/new`, body)

      dispatch({
          type:PRODUCT_NEW_SUCCESS,
          payload: data.product
      })
  }catch (error){
      dispatch({
          type:PRODUCT_NEW_FAIL,
          payload: error.response.data.message
      })
  }
}

export const putProductDetails = (id, body) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_UPDATE_REQUEST})
    
    const {data} = await axios.put(`/api/product/${id}`, body)

      dispatch({
          type:PRODUCT_UPDATE_SUCCESS,
          payload: data.product
      })
  }catch (error){
      dispatch({
          type:PRODUCT_UPDATE_FAIL,
          payload: error.response.data.message
      })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DELETE_REQUEST})
    
    const {data} = await axios.delete(`/api/product/${id}`)

      dispatch({
          type:PRODUCT_DELETE_SUCCESS,
          payload: data.product
      })
  }catch (error){
      dispatch({
          type:PRODUCT_DELETE_FAIL,
          payload: error.response.data.message
      })
  }
}

// Clear error in dispatch

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}