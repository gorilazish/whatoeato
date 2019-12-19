import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import shuffle from './shuffle.png'

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 25px;
  width: 25px;
`

const StyledButton = styled(Button)`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 15px;
  cursor: pointer;
`

export default function ShuffleButton({ children, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <Icon style={{ backgroundImage: `url(${shuffle})` }} />
    </StyledButton>
  )
}
