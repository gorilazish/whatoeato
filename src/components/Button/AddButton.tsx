import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import plus from './plus.png'

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 40px;
  width: 40px;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 0px;
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
      <Icon style={{ backgroundImage: `url(${plus})` }} />
    </StyledButton>
  )
}
