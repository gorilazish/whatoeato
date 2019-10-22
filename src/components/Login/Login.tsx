import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { Link } from '@reach/router'
import { loginWithEmail } from '../../auth'

// @ts-ignore
function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLoginClick() {
    try {
      await loginWithEmail(email, password)
      props.navigate('/', { replace: true })
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
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="off"
          autoFocus
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
        onClick={handleLoginClick}
      >
        Sign in
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Signup
      </Button>
    </form>
  )
}

export default Login
