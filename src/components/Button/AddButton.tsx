import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import plus from './plus.png'

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 640px) {
    transition: background-color 0.1s ease-in-out;

    :hover {
      background-color: rgba(255, 127, 80, 1);
    }
  }
`

export default function AddButton({ children, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <AddIcon />
    </StyledButton>
  )
}

function AddIcon() {
  return (
    <svg
      height='25'
      width='25'
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      enableBackground='new 0 0 42 42'
      version='1.1'
      viewBox='0 0 42 42'
      xmlSpace='preserve'
    >
      <path d='M42 20L22 20 22 0 20 0 20 20 0 20 0 22 20 22 20 42 22 42 22 22 42 22z'></path>
    </svg>
  )
}
