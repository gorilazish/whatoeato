import React from 'react'
import { Button } from '@material-ui/core'
// @ts-ignore
import { withRouter, Link } from 'react-router-dom'
import { useSession, signOut } from '../../auth'
import RecipeList from './RecipeList'

function Dashboard(props: any) {
  // @ts-ignore
  const user = useSession()

  async function handleLogoutClick() {
    await signOut()
    props.history.push('/')
  }

  return !user ? (
    <>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </>
  ) : (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        to={'/create'}
        component={Link}
      >
        Add recipe
      </Button>

      <RecipeList />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </>
  )
}

// @ts-ignore
export default withRouter(Dashboard)
