import React from 'react'
import styled from '@emotion/styled'

import { signOut } from '../../auth'

import { Button, Typography } from '@material-ui/core'

const Container = styled.nav`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  border-bottom: 2px solid coral;
  background: white;
  z-index: 10;
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  margin: 0 auto;
  padding: 10px;
`

export default function Header({ user }: any) {
  async function handleLogoutClick() {
    await signOut()
  }
  return (
    <Container>
      <ContentWrapper>
        {user && user.displayName ? (
          <Typography component="h1" variant="h5">
            Hello {user.displayName}
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
        )}

        <div></div>
        <div>
          {user && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          )}
        </div>
      </ContentWrapper>
    </Container>
  )
}
