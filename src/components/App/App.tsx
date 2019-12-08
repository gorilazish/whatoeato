import React from 'react'
import * as firebase from 'firebase/app'
import { Router } from '@reach/router'

import { useAuth } from '../../auth'

import { UserContext } from '../../UserContext'
import { CircularProgress } from '@material-ui/core'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'
import 'typeface-roboto'
import styled from '@emotion/styled'
import Header from '../Header/Header'
import Frontpage from '../Frontpage/Frontpage'

const Container = styled.main`
  width: auto;
  padding: 0 10px;

  @media (min-width: 420px) {
    max-width: 1440px;
    margin: 0 auto;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
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
          <Router primary={false} style={{ width: '100%' }}>
            {user ? <Dashboard path='/*' /> : <Frontpage path='/*' />}
            <Login path='login' />
            <Signup path='signup' />
          </Router>
        </UserContext.Provider>
      </ContentWrapper>
    </Container>
  ) : (
    <div id='loader'>
      <CircularProgress />
    </div>
  )
}

// @ts-ignore
export default App
