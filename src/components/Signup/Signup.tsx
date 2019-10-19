import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
// @ts-ignore
import { Link, withRouter } from 'react-router-dom'
import { createUserWithEmail } from '../../auth'

// @ts-ignore
function Signup(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignupClick() {
    try {
      createUserWithEmail(name, email, password)
      props.history.replace('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form
      // @ts-ignore
      onSubmit={e => e.preventDefault() && false}
    >
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          autoComplete="off"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="off"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignupClick}
      >
        Signup
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/login"
      >
        Go back to Login
      </Button>
    </form>
  )
}

// @ts-ignore
export default withRouter(Signup)
