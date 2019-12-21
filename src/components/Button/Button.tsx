/** @jsx jsx */
import React from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

type Props = any

const interactionStyles = css`
  transition: all 0.3s, outline-offset 0s, color 0.2s ease 0.1s;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    transition: all 0.3s, outline-offset 0s, color 0.1s ease 0.2s;
    background-color: rgba(177, 140, 148, 0.5);
    z-index: -1;
  }

  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(5%);
  }
`

const StyledButton = styled.button`
  background-color: rgb(254, 203, 214);
  display: inline-block;
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 10px 20px;
  border: none;
  text-align: center;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-weight: bold;

  :focus {
    outline: 1px dashed lightgray;
    outline-offset: 4px;
  }

  ${({ animate }: any) => animate && interactionStyles};
  ${({ disabled }: any) =>
    disabled &&
    css`
      cursor: default;
      background: grey;
    `};
`

const StyledLink = StyledButton.withComponent(Link)

const Button = ({
  children,
  to,
  onClick,
  animate = true,
  disabled,
  ...rest
}: Props) => {
  if (to)
    return (
      <StyledLink
        to={to}
        onClick={(e: any) => {
          if (onClick) {
            onClick(e)
          }
        }}
        {...rest}
        animate={animate}
      >
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
    <StyledButton
      onClick={handleClick}
      type='button'
      {...rest}
      animate={animate}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

export default Button
