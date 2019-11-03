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
  margin: 0 5px;

  @media (min-width: 420px) {
    width: 95vw;
    margin: 0 auto;
  }
`

const ContentWrapper = styled.div`
  margin-top: 52px;
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
          <Router
            basepath={
              process.env.NODE_ENV === 'production' ? '/whatoeato' : '/'
            }
            primary={false}
            style={{ width: '100%' }}
          >
            {user ? <Dashboard path="/*" /> : <Frontpage path="/*" />}
            <Login path="/login" />
            <Signup path="/signup" />
          </Router>
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
