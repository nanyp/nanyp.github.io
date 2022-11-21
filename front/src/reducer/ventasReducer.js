import { ALL_VENTAS_REQUEST, 
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
  CLEAR_ERRORS} from "../constants/ventasConstants";

  //Status of all ventas --> Reducer
export const ventaReducer = (state = { ventas: [] }, action) => {
  switch (action.type) {
    case ALL_VENTAS_REQUEST:
      return {
        loading: true,
        ventas: []
      };

    case ALL_VENTAS_SUCCESS:
      return {
        loading: false,
        ventas: action.payload.ventas,
        quantity: action.payload.quantity
      };

    case ALL_VENTAS_FAIL:
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

export const newVentasReducer = (state = { ventas: [] }, action) => {
  switch (action.type) {
    case NEW_VENTAS_REQUEST:
      return {
        loading: true,
        ventas: []
      };

    case NEW_VENTAS_SUCCESS:
      return {
        loading: false,
        ventas: action.payload.ventas,
        quantity: action.payload.quantity
      };

    case NEW_VENTAS_FAIL:
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

export const cartReducer = (state = { productsCart: [] }, action) => {
  switch (action.type) {
    case ALL_CART_REQUEST:
      return {
        loading: true,
        productsCart: []
      };

    case ALL_CART_SUCCESS:
      return {
        loading: false,
        productsCart: action.payload.productsCart,
        quantity: action.payload.quantity
      };

    case ALL_CART_FAIL:
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

export const cartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_REQUEST:
      console.log(...state)
      return {
        loading: true,
        cartItems: []
      };

    case CART_ITEM_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload.cartItems,
        quantity: action.payload.quantity
      };

    case CART_ITEM_FAIL:
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

export const editCartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case EDIT_CART_REQUEST:
      return {
        loading: true,
        cartItems: []
      };

    case EDIT_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload.cartItems,
        quantity: action.payload.quantity
      };

    case EDIT_CART_FAIL:
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

export const delCartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case DEL_CART_REQUEST:
      return {
        loading: true,
        cartItems: []
      };

    case DEL_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload.cartItems,
        quantity: action.payload.quantity
      };

    case DEL_CART_FAIL:
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
