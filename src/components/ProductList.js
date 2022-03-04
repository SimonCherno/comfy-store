import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filteredProducts: products, gridView} = useFilterContext();
  return <>
    {products.length > 0
      ? (gridView 
        ? <GridView products={products} />
        : <ListView products={products} />)
      : <h4 style={{'textTransform':'none'}}>Sorry, no products matched your search</h4>}
  </>
}

export default ProductList
