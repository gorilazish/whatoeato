import React from 'react'
import styled from '@emotion/styled'

import RecipeCard from './RecipeCard'

const GridList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1, minmax(75px, auto));
  grid-gap: 25px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
  }
`

type Props = {
  recipes: any[]
}

export default function RecipeList({ recipes }: Props) {
  return (
    <div>
      <GridList>
        {recipes &&
          recipes.length > 0 &&
          recipes.map((item, index) => (
            <RecipeCard key={index} id={item.id} title={item.title} {...item} />
          ))}
      </GridList>
    </div>
  )
}
