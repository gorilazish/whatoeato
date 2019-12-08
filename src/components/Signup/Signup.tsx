import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { createUserWithEmail } from '../../auth'
import Button from '../Button/Button'

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 20px;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 1440px;
    width: 70%;
    margin: 0 auto;
  }
`

// @ts-ignore
function Signup(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignupClick() {
    try {
      await createUserWithEmail(name, email, password)
      props.navigate('../', { replace: true })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Wrapper>
      <form
        // @ts-ignore
        onSubmit={e => e.preventDefault() && false}
      >
        <h1>Create a user</h1>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input
            id='name'
            name='name'
            autoComplete='off'
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <Input
            id='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            name='password'
            type='password'
            id='password'
            autoComplete='off'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type='submit' onClick={handleSignupClick}>
          Signup
        </Button>
      </form>
    </Wrapper>
  )
}

export default Signup
