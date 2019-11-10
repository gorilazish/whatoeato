import React from 'react'
import styled from '@emotion/styled'

import { removeRecipeFromQueue } from '../../db'

import RecipeCard from './RecipeCard'

const QueueContainer = styled.div`
  padding: 20px 0;
  width: 100vw;
  background: rgba(250, 135, 127, 0.49);

  @media (min-width: 640px) {
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
  const handleRemoveClick = (id: string) => {
    removeRecipeFromQueue(id)
  }

  return (
    <QueueContainer>
      <div style={{ padding: '0 20px' }}>
        <h2>My Queue</h2>
      </div>
      {recipes && recipes.length > 0 ? (
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
      ) : (
        <div>
          <h3>Your queue is empty</h3>
          <p>Add items to queue from your recipe list</p>
        </div>
      )}
    </QueueContainer>
  )
}

export default RecipeQueue
