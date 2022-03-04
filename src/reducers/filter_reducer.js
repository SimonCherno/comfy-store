import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS){
    let maxPrice = Math.max(...action.payload.map((product) => product.price));
    return {
      ...state, 
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {...state.filters, maxPrice, price: maxPrice}
    }
  }
  if (action.type === SET_GRIDVIEW){
    return {
      ...state, gridView: true
    }
  }
  if (action.type === SET_LISTVIEW){
    return {
      ...state, gridView: false
    }
  }
  if (action.type === UPDATE_SORT){
    return {
      ...state, sort: action.payload
    }
  }
  if (action.type === SORT_PRODUCTS){
    const {sort, filteredProducts} = state;
    let sortedProducts;
    if (sort === 'price-lowest') {
      sortedProducts = filteredProducts.sort((a, b) => {
      return a.price - b.price;
      })
    }
    if (sort === 'price-highest') {
      sortedProducts = filteredProducts.sort((a, b) => {
      return b.price - a.price;
      })
    }
    if (sort === 'name-a-z') {
      sortedProducts = filteredProducts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    }
    if (sort === 'name-z-a') {
      sortedProducts = filteredProducts.sort((a, b) => {      
      return b.name.localeCompare(a.name);
      })
    }
    return {
      ...state, filteredProducts: sortedProducts
    }
  }
  if (action.type === UPDATE_FILTERS){
    let {value, name, checked} = action.payload;
    if (name === 'freeShipping'){
      value = checked;
    }
    return {
      ...state, filters: {...state.filters, [name]: value } 
    }
  }
  if (action.type === FILTER_PRODUCTS) { 
    const {allProducts, filters} = state;
    const {text, category, company, color, price, freeShipping} = filters;
    let tempProducts = [...allProducts];
    if (text) {
      tempProducts = allProducts.filter((product) => product.name.toLowerCase().startsWith(text.toLowerCase()));
    }
    if (category !== 'all'){
      tempProducts = tempProducts.filter((product) => product.category === category);
    }
    if (company !== 'all'){
      tempProducts = tempProducts.filter((product) => product.company === company);
    }
    if (color !== 'all'){
      tempProducts = tempProducts.filter((product) => product.colors.includes(color));
    }
    tempProducts = tempProducts.filter((product) => product.price <= price);
    if (freeShipping){
      tempProducts = tempProducts.filter((product) => product.shipping);
    }
    return {
      ...state, filteredProducts: tempProducts
    }
  }
  if (action.type === CLEAR_FILTERS){
    return {
      ...state, 
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        freeShipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
