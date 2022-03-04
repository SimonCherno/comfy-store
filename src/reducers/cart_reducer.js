import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART){
    const {id, amount, color, product} = action.payload;
    let added = false;
    let newCart = state.cart.map((item) => {
      if (item.id === id && item.color === color) {
        item.amount = item.amount + amount;
        if (item.amount > product.stock){
          item.amount = product.stock;
        }
        added = true;
      } 
      return item;
    })
    if (!added){
      newCart.push(action.payload)
    }
    return {
      ...state, cart: newCart
    }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const {totalItems, totalAmount, totalShipping} = state.cart.reduce((totals, item) => {
      let {totalShipping, totalAmount, totalItems} = totals;
      if (item.product.shipping){
        totalShipping += state.shippingFee * item.amount;
      }
      totalItems += item.product.price;
      totalAmount += item.amount;
      return {totalShipping, totalItems, totalAmount};
    }, {totalAmount: 0, totalItems: 0, totalShipping: 0});
    return {
      ...state, totalItems, totalAmount, totalShipping
    }
  }
  if (action.type === CLEAR_CART) {
    return {
      ...state, cart: []
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const {id, color} = action.payload;
    let newCart = state.cart.filter((item) => {
      return  item.id !== id || item.color !== color
    });
    return {
      ...state, cart: newCart
    }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {newAmount, id, color} = action.payload;
    let newCart = state.cart.map((item) => {
      if (item.id === id && item.color === color) {
        return {
          ...item, amount: newAmount
        }
      }
      else return item
    });
    return {
      ...state, cart: newCart
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
