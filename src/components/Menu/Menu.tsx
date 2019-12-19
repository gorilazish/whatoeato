import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled/macro'
import { signOut } from '../../auth'

import Button from '../Button/Button'

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 237, 237, 0.82);
  height: 100vh;
  width: 65vw;
  text-align: left;
  padding: 2rem;
  position: fixed;
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

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default function Menu({ isOpen, onRequestClose, ...rest }: any) {
  const ref: any = useRef()
  useOutsideClick(ref, () => {
    if (isOpen) {
      onRequestClose()
    }
  })

  return (
    <StyledMenu
      ref={ref}
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        borderRight: isOpen ? '2px dashed black' : 'none',
      }}
    >
      <Button onClick={() => onRequestClose()} to={'/'}>
        Home
      </Button>
      <hr />
      <Button
        type='submit'
        onClick={() => {
          onRequestClose()
          signOut()
        }}
      >
        Logout
      </Button>
    </StyledMenu>
  )
}
