/** @jsx jsx */
import React from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import Button from './Button'

const CategoryButton = styled(Button)`
  transition: all 0.25s ease-in-out;
  padding: 10px;
  height: 100%;
  width: 100%;
  border: 2px solid;
  border-radius: 2px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.5rem;
  height: auto;
  padding: 10px 5px;

  @media (min-width: 640px) {
    font-size: 0.8rem;
  }
`

const CategoryToggle = ({ active, children, ...rest }: any) => {
  return (
    <CategoryButton
      {...rest}
      css={css`
        background-color: ${active ? 'transparent' : 'transparent'};
        color: ${active ? 'black' : 'lightgray'};
        border-color: ${active ? 'black' : 'lightgray'};
      `}
    >
      {children}
    </CategoryButton>
  )
}

export default CategoryToggle
