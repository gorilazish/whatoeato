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
  border: 1px solid;
  border-radius: 3px;
`

const CategoryToggle = ({ active, children, ...rest }: any) => {
  return (
    <CategoryButton
      {...rest}
      css={css`
        background-color: ${active ? 'black' : 'transparent'};
        color: ${active ? 'white' : 'black'};
      `}
    >
      {children}
    </CategoryButton>
  )
}

export default CategoryToggle
