import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  let rounded;
  if (stars) {
    rounded = Math.round(stars * 2)/2;
  }
  const DOMstars = Array.from({length:5}, (_, i) => {
    return <span key={i}>
      {i + 1 < rounded 
        ? <BsStarFill />
        : (i + 0.5 === rounded
          ? <BsStarHalf />
          : <BsStar />)
      }
    </span>
  })
  return <Wrapper>
    {rounded && DOMstars}
    <p>({reviews} customer reviews)</p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
