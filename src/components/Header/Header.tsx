import React, { useState } from 'react'
import styled from '@emotion/styled'

import Burger from '../Button/Burger'
import Menu from '../Menu/Menu'

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 10;
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 0 auto;
  padding: 10px;
`

const Utils = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export default function Header({ user }: any) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <Container>
      <ContentWrapper>
        <Utils>
          <Burger
            onClick={() => setMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
          />
        </Utils>

        {user && <div></div>}
        {user && <Utils></Utils>}
      </ContentWrapper>
      <Menu isOpen={isMenuOpen} />
    </Container>
  )
}
