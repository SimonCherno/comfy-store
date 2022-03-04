import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({props}) => {
  const {amount, setAmount, stock, id, color} = props;
  const handleAmount = (type) => {
    if (type === 'minus'){
      if (amount === 1) return
      else{
        setAmount(amount - 1, id, color);
      }
    }
    if (type === 'plus'){
      if (amount === stock) return
      else{
        setAmount(amount + 1, id, color);
      }
    }
  }
  return <Wrapper>
    <button onClick={() => handleAmount('minus')}>
      <FaMinus/>
    </button>
    <h2>{amount}</h2>
    <button onClick={() => handleAmount('plus')}>
      <FaPlus />
    </button>
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
