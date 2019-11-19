import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import plus from './plus.png'

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 30px;
  width: 30px;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: none;
  opacity: 0.8;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 640px) {
    opacity: 0.8;
    transition: all 0.1s ease-in-out;

    :hover {
      opacity: 1;
    }
  }
`

export default function AddButton({ children, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <Icon style={{ backgroundImage: `url(${plus})` }} />
    </StyledButton>
  )
}
