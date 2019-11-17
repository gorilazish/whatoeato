import React, { useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'

import Burger from '../Button/Burger'
import Menu from '../Menu/Menu'
import AddButton from '../Button/AddButton'

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  z-index: 10;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.75);
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
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

        {user && (
          <div>
            <AddButton onClick={() => navigate('create')} />
          </div>
        )}
        {user && <Utils></Utils>}
      </ContentWrapper>
      <Menu isOpen={isMenuOpen} />
    </Container>
  )
}
