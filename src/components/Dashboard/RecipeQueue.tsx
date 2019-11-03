import React from 'react'
import styled from '@emotion/styled'

import { removeRecipeFromQueue } from '../../db'

import RecipeCard from './RecipeCard'

const QueueContainer = styled.div`
  padding: 20px 20px;
  width: 100vw;
  background: lightpink;

  @media (min-width: 640px) {
    background: lightgrey;
    width: 50%;
  }
`
type StyledSliderProps = {
  itemCount: number
}
const HorizontalSlider = styled.div<StyledSliderProps>`
  display: grid;
  grid-gap: 10px;

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.25 * var(--gutter));

  grid-template-columns: ${({ itemCount }: any) => `repeat(${itemCount}, 60%)`};

  @media (min-width: 640px) {
    grid-template-columns: ${({ itemCount }: any) =>
      `repeat(${itemCount}, 30%)`};
  }
`

const RecipeQueue = ({ recipes }: any) => {
  if (!recipes || recipes.length < 1) return null

  const handleRemoveClick = (id: string) => {
    removeRecipeFromQueue(id)
  }

  return (
    <QueueContainer>
      <h2>My Queue</h2>
      <HorizontalSlider itemCount={recipes.length}>
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
