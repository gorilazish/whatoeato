import React from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'

type Props = any

const StyledButton = styled.button`
  padding: 10px 20px;
  background: coral;
  border: 2px solid black;
  text-align: center;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-weight: bold;
`

const StyledLink = StyledButton.withComponent(Link)

const Button = ({ children, to, ...rest }: Props) => {
  if (to)
    return (
      <StyledLink to={to} {...rest}>
        {children}
      </StyledLink>
    )
  return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button
