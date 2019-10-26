import React from 'react'
import styled from '@emotion/styled'

import RecipeCard from './RecipeCard'

const GridList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 35px;
  }
`

type Props = {
  recipes: any[]
}

export default function RecipeList({ recipes }: Props) {
  return (
    <GridList>
      {recipes &&
        recipes.length > 0 &&
        recipes.map((item, index) => (
          <RecipeCard key={index} id={item.id} title={item.title} {...item} />
        ))}
    </GridList>
  )
}
