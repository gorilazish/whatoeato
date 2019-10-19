import React from 'react'
import * as firebase from 'firebase/app'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// @ts-ignore
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useAuth } from '../../auth'

import withStyles from '@material-ui/core/styles/withStyles'
import { UserContext } from '../../UserContext'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  CssBaseline,
} from '@material-ui/core'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard'
import 'typeface-roboto'

const theme = createMuiTheme()

const styles = (theme: any) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: '70vw',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
})

function App(props: any) {
  // @ts-ignore
  const { classes } = props
  // @ts-ignore
  const { initializing, user } = useAuth(firebase.auth())

  return initializing !== true ? (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        {user && user.displayName && (
          <Typography component="h1" variant="h5">
            Hello {user.displayName}
          </Typography>
        )}

        <UserContext.Provider
          value={{
            initializing,
            // @ts-ignore
            user: user,
          }}
        >
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </UserContext.Provider>
      </Paper>
    </main>
  ) : (
      <div id="loader">
        <CircularProgress />
      </div>
    )
}

// @ts-ignore
export default withStyles(styles)(App)
