import React from 'react'
import styled from '@emotion/styled'

import { signOut } from '../../auth'

import Button from '../Button/Button'

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
  async function handleLogoutClick() {
    await signOut()
  }
  return (
    <Container>
      <ContentWrapper>
        <Utils>
          <Button to="/">Home</Button>
        </Utils>

        {user && <div></div>}
        {user && (
          <Utils>
            <h3>{user.displayName}</h3>
            <Button type="submit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </Utils>
        )}
      </ContentWrapper>
    </Container>
  )
}
