import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {filters, updateFilters, allProducts, clearFilters} = useFilterContext();
  const {text, category, company, color, price, freeShipping, maxPrice} = filters;
  let categories = getUniqueValues('category', allProducts);
  let companies = getUniqueValues('company', allProducts);
  let colors = getUniqueValues('colors', allProducts);
  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
        <input 
          type="text" 
          name='text'
          className="search-input"
          value={text}
          onChange={updateFilters}
          placeholder='search'
        />
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
        <h5>Category</h5>     
        <div className="btn-container">
          {categories.map((categoryBtn, i) => {
            return <button 
              value={categoryBtn} 
              name='category' 
              onClick={updateFilters} 
              className={categoryBtn === category ? 'active' : null} 
              key={i}
              >
                {categoryBtn}
              </button>
          })}
        </div>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
        <h5>company</h5>
        <select
          className='company'
          value={company}
          onChange={updateFilters}
          name='company'
        >
          {companies.map((company, i) => {
            return <option value={company} key={i}>
              {company}
            </option>
          })}
        </select>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
        <h5>colors</h5>
        <div className="colors">
          {colors.map((btnColor, i) => {
            if (btnColor === 'all'){
              return <button 
                name='color' 
                value='all' 
                className={color === 'all' ? 'all-btn active': 'all-btn'}
                onClick={updateFilters}
                key={i}
                >
                all
              </button>
            }
            return <button 
              className={color === btnColor ? 'color-btn active' : 'color-btn'}
              value={btnColor}
              onClick={updateFilters}
              name='color'
              style={{'background':btnColor}}
              key={i}
            >
              {color === btnColor && <FaCheck />}
            </button>
          })}
        </div>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
          <h5>price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input 
            type="range" 
            value={price}  
            onChange={updateFilters}
            max={maxPrice}
            min={0}
            name='price'
          />
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="form-control">
        <div className="shipping">
          <label htmlFor="shipping">free shipping</label>
          <input 
            type="checkbox" 
            checked={freeShipping}
            onChange={updateFilters}
            name='freeShipping'
            id='shipping'
          />
        </div>
      </form>
      <button onClick={clearFilters} className="clear-btn">
        clear filters
      </button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
