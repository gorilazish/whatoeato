import React from 'react'
import * as firebase from 'firebase/app'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Router, Link } from '@reach/router'

import { useAuth } from '../../auth'

import { UserContext } from '../../UserContext'
import { CircularProgress } from '@material-ui/core'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'
import 'typeface-roboto'
import styled from '@emotion/styled'
import Header from '../Header/Header'

const theme = createMuiTheme()

const Container = styled.main`
  width: auto;
  margin: 0 5px;

  @media (min-width: 420px) {
    width: 95vw;
    margin: 0 auto;
  }
`

const ContentWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
`

function App(props: any) {
  // @ts-ignore
  const { initializing, user } = useAuth(firebase.auth())
  return initializing !== true ? (
    <Container>
      <ContentWrapper>
        <Header user={user} />

        <UserContext.Provider
          value={{
            initializing,
            // @ts-ignore
            user: user,
          }}
        >
          <MuiThemeProvider theme={theme}>
            {/* <Router basename="/whatoeato"> */}
            <Router>
              <Dashboard path="/" />
              <Login path="/login" />
              <Signup path="/signup" />
            </Router>
          </MuiThemeProvider>
        </UserContext.Provider>
      </ContentWrapper>
    </Container>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  )
}

// @ts-ignore
export default App
