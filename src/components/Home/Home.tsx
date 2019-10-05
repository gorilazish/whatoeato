import React from 'react'
import { Button } from '@material-ui/core'
// @ts-ignore
import { Link } from 'react-router-dom'

// @ts-ignore
export default function HomePage(props) {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/dashboard"
      >
        Dashboard
      </Button>
    </>
  )
}
