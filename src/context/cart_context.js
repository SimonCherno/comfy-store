import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const loadCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) return cart
  else return []
}

const initialState = {
  cart: loadCart(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
  totalShipping: 0
}

const CartContext = React.createContext()


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (id, amount, color, product) => {
    dispatch({type:ADD_TO_CART, payload:{id, amount, color, product}})
  }
  const setAmount = (newAmount, id, color) => {
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload: {newAmount, id, color}});
  }

  const clearCart = () => {
    dispatch({type:CLEAR_CART})
  }
  
  const removeCartItem = (id, color) => {
    dispatch({type:REMOVE_CART_ITEM, payload:{id, color}});
  }

  useEffect(() => {
    dispatch({type:COUNT_CART_TOTALS});
    localStorage.setItem('cart',JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      setAmount,
      clearCart,
      removeCartItem,
    }}>{children}</CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
