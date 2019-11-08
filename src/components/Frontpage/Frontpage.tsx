import React from 'react'
import styled from '@emotion/styled'

import Button from '../Button/Button'

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 20px;
`

export default function Frontpage(props: any) {
  return (
    <Wrapper>
      <Button type="submit" to="login">
        Login
      </Button>
      <Button type="submit" to="signup">
        Register
      </Button>
    </Wrapper>
  )
}
