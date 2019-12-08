import React from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'

type Props = any

const StyledButton = styled.button`
  padding: 10px 20px;
  background: coral;
  border: none;
  text-align: center;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-weight: bold;

  :focus {
    outline: 1px dashed lightgrey;
    outline-offset: 3px;
  }
`

const StyledLink = StyledButton.withComponent(Link)

const Button = ({ children, to, onClick, ...rest }: Props) => {
  if (to)
    return (
      <StyledLink to={to} {...rest}>
        {children}
      </StyledLink>
    )

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <StyledButton onClick={handleClick} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
