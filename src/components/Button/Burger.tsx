import React from 'react'
import styled from '@emotion/styled/macro'

export const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: grey;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`

export default function Burger({ isOpen, ...rest }: any) {
  return (
    <StyledBurger {...rest}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
