import { ALL_PRODUCTS_REQUEST, 
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
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  CLEAR_ERRORS} from "../constants/productConstants";

  //Status of all products --> Reducer
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        quantity: action.payload.quantity
      };

    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}

//Details by product --> Reducer
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case PRODUCT_DETAILS_REQUEST:
          return {
              ...state,
              loading: true
          }

      case PRODUCT_DETAILS_SUCCESS:
          return {
              loading: false,
              product: action.payload
          }

      case PRODUCT_DETAILS_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}

export const productNewReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case PRODUCT_NEW_REQUEST:
          return {
              ...state,
              loading: true
          }

      case PRODUCT_NEW_SUCCESS:
          return {
              loading: false,
              product: action.payload
          }

      case PRODUCT_NEW_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case PRODUCT_UPDATE_REQUEST:
          return {
              ...state,
              loading: true
          }

      case PRODUCT_UPDATE_SUCCESS:
          return {
              loading: false,
              product: action.payload
          }

      case PRODUCT_UPDATE_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}

export const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case PRODUCT_DELETE_REQUEST:
          return {
              ...state,
              loading: true
          }

      case PRODUCT_DELETE_SUCCESS:
          return {
              loading: false,
              product: action.payload
          }

      case PRODUCT_DELETE_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}