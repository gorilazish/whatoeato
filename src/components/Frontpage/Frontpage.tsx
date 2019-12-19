import React from 'react'
import styled from '@emotion/styled'

import Button from '../Button/Button'
import bckgImg from './background.jpeg'

const Wrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-gap: 70px;
  text-align: center;

  @media (min-width: 640px) {
    top: 35px;
    grid-gap: 150px;
    max-width: 1440px;
    width: 70%;
    margin: 0 auto;
  }
`

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-position: center;
  background-size: cover;
`

const WelcomeFormContainer = styled.div`
  display: grid;
  grid-gap: 40px;

  @media (min-width: 640px) {
    width: 40%;
    max-width: 1440px;
    margin: 0 auto;
  }
`

const CtaButton = styled(Button)`
  text-transform: uppercase;
  padding: 15px 20px;
  background: #000000de;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #fdccd7;
`

export default function Frontpage(props: any) {
  return (
    <Wrapper>
      <BackgroundImage style={{ backgroundImage: `url(${bckgImg})` }} />
      <h1>Welcome to the best recipe app</h1>
      <WelcomeFormContainer>
        <CtaButton type='submit' to='login'>
          Login
        </CtaButton>
        <CtaButton type='submit' to='signup'>
          Register
        </CtaButton>
      </WelcomeFormContainer>
    </Wrapper>
  )
}
