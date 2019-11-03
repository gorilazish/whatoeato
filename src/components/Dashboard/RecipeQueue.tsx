import React from 'react'
import styled from '@emotion/styled'

import { removeRecipeFromQueue } from '../../db'

import RecipeCard from './RecipeCard'

const QueueContainer = styled.div`
  padding: 20px 0;
`

const RecipeQueue = ({ recipes }: any) => {
  if (!recipes || recipes.length < 1) return null

  const handleRemoveClick = (id: string) => {
    removeRecipeFromQueue(id)
  }

  return (
    <QueueContainer>
      <h2>My Queue</h2>
      {recipes.map((item: any, index: number) => (
        <RecipeCard
          key={index}
          onCtaClick={handleRemoveClick}
          ctaLabel="Remove from queue"
          {...item}
        />
      ))}
    </QueueContainer>
  )
}

export default RecipeQueue
