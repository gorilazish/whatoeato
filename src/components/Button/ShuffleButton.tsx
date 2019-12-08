import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import shuffle from './shuffle.png'

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 30px;
  width: 30px;
`

const StyledButton = styled(Button)`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: none;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 640px) {
    transition: background-color 0.1s ease-in-out;

    :hover {
      background-color: rgba(255, 127, 80, 1);
    }
  }
`

export default function ShuffleButton({ children, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <Icon style={{ backgroundImage: `url(${shuffle})` }} />
    </StyledButton>
  )
}