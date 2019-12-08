import React from 'react'
import styled from '@emotion/styled'

import Button from '../Button/Button'

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 20px;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 1440px;
    width: 70%;
    margin: 0 auto;
  }
`

export default function Frontpage(props: any) {
  return (
    <Wrapper>
      <h1>Welcome to the best recipe app</h1>
      <h2>Login with existing account</h2>
      <Button type='submit' to='login'>
        Login
      </Button>
      <h2>Or Signup</h2>
      <Button type='submit' to='signup'>
        Register
      </Button>
    </Wrapper>
  )
}
