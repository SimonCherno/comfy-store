import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const {id} = useParams();
  const {isProductLoading, isProductError, singleProduct, fetchProduct} = useProductsContext();
  const history = useHistory();
  useEffect(() => {
    fetchProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (isProductError){
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [isProductError]);

  if(isProductLoading) return <Loading />
  if(isProductError) return <Error />
  
  const {stock, price, images, reviews, stars, name, description, company} = singleProduct;
  return <Wrapper>
    <PageHero title={name} singleProduct={true} />
    <section className="section section-center page">
      <Link className='btn' to='/products'>back to products</Link>
      <div className="product-center">
        <ProductImages images={images}/>
        <article>
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}/>
          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <div className="info">
            <span>available:</span>
            <p>{stock > 0 ? 'in stock' : 'out of stock'}</p>
            <span>SKU:</span>
            <p>{id}</p>
            <span>brand:</span>
            <p>{company}</p>
          </div>
          <hr />
          {stock > 0 && <AddToCart product={singleProduct} />}
        </article>
      </div>
    </section>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
