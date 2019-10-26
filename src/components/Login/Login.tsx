import React, { useState } from 'react'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { loginWithEmail } from '../../auth'
import Button from '../Button/Button'

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
      <h1>Login with existing account</h1>
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
      <Button type="submit" onClick={handleLoginClick}>
        Sign in
      </Button>
    </form>
  )
}

export default Login
