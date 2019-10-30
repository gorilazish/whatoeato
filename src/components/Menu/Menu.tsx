import React from 'react'
import styled from '@emotion/styled/macro'
import { signOut } from '../../auth'

import Button from '../Button/Button'

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: lightgray;
  height: 100vh;
  width: 50vw;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);

  @media (min-width: 640px) {
    width: 34vw;
  }

  a,
  button {
    text-transform: uppercase;
  }
`

export default function Menu({ isOpen, ...rest }: any) {
  return (
    <StyledMenu
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <Button to="/">Home</Button>
      <hr />
      <Button type="submit" onClick={signOut}>
        Logout
      </Button>
    </StyledMenu>
  )
}
