import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  allProducts: [],
  filteredProducts: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    price: 0,
    maxPrice: 0,
    freeShipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setGridView = (gridView) => {
    if (gridView){
      dispatch({type:SET_GRIDVIEW})
    } else {
      dispatch({type:SET_LISTVIEW})
    }
  }

  const sortProducts = (order) => {
    dispatch({type:UPDATE_SORT, payload:order});
  }

  const updateFilters = (e) => {
    dispatch({type:UPDATE_FILTERS, payload: e.target})
  }

  const clearFilters = () => {
    dispatch({type:CLEAR_FILTERS});
  }

  useEffect(() => {
    dispatch({type:LOAD_PRODUCTS, payload: products});
  }, [products]);
  
  useEffect(() => {
    dispatch({type:SORT_PRODUCTS});
  }, [products, state.sort]);

  useEffect(() => {
    dispatch({type:FILTER_PRODUCTS});
  }, [products, state.filters]);
  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      sortProducts,
      updateFilters,
      clearFilters
    }}>{children}</FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
