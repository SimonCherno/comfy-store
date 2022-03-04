import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url , products, product} from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  isProductsLoading: false,
  isError: false,
  products: [],
  featuredProducts: [],
  isProductLoading: false,
  isProductError: false,
  singleProduct: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const openSidebar = () => {
    dispatch({type:SIDEBAR_OPEN});
  }
  const closeSidebar = () => {
    dispatch({type:SIDEBAR_CLOSE});
  }

  const fetchProducts = async () => {
    dispatch({type:GET_PRODUCTS_BEGIN});
    try {
      const response = await axios(url);
      const {data} = response;
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: data});
    }
    catch (error) {
      console.log(error);
      console.log(products);
      dispatch({type:GET_PRODUCTS_ERROR})
      // dispatch({type: GET_PRODUCTS_SUCCESS, payload: products});
      
    }
  }
  
  const fetchProduct = async (singleProductUrl) => {
    dispatch({type:GET_SINGLE_PRODUCT_BEGIN});
    try {
      const {data} = await axios(singleProductUrl);
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
      console.log(error);
      console.log(product);
      // dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload: product});
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{
      ...state,
      openSidebar,
      closeSidebar,
      fetchProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
