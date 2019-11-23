import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import DeleteIcon from '@material-ui/icons/Delete'

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
  padding: 5px;
  cursor: pointer;

  @media (min-width: 640px) {
    background-color: rgba(255, 127, 80, 0.8);
    transition: background-color 0.1s ease-in-out;

    :hover {
      background-color: rgba(255, 127, 80, 1);
    }
  }

  svg {
    fill: white;
    height: 30px;
    width: 30px;
  }
`

export default function RemoveButton({ children, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <DeleteIcon />
    </StyledButton>
  )
}
