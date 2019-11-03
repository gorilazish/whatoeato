import React from 'react'
import styled from '@emotion/styled'

import { removeRecipeFromQueue } from '../../db'

import RecipeCard from './RecipeCard'

const QueueContainer = styled.div`
  padding: 20px 0;
  max-width: 100%;
`

const HorizontalSlider = styled.div`
  display: grid;
  grid-gap: 10px;

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.25 * var(--gutter));
`

const RecipeQueue = ({ recipes }: any) => {
  if (!recipes || recipes.length < 1) return null

  const handleRemoveClick = (id: string) => {
    removeRecipeFromQueue(id)
  }

  return (
    <QueueContainer>
      <h2>My Queue</h2>
      <HorizontalSlider
        style={{
          // @ts-ignore
          'grid-template-columns': `repeat(${recipes.length}, 60%)`,
        }}
      >
        {recipes.map((item: any, index: number) => (
          <RecipeCard
            key={index}
            onCtaClick={handleRemoveClick}
            ctaLabel="Remove from queue"
            style={{
              scrollSnapAlign: 'center',
            }}
            {...item}
          />
        ))}
      </HorizontalSlider>
    </QueueContainer>
  )
}

export default RecipeQueue
