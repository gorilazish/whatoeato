/** @jsx jsx */
import React from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import { removeRecipeFromQueue } from '../../db'

import RecipeCard from './RecipeCard'
import RemoveButton from '../Button/RemoveButton'

const QueueContainer = styled.div`
  width: 100vw;
  background: rgba(250, 135, 127, 0.49);

  @media (min-width: 640px) {
    max-width: 1440px;
    background: white;
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

  grid-template-columns: ${({ itemCount }: any) => `repeat(${itemCount}, 75%)`};

  @media (min-width: 640px) {
    grid-template-columns: ${({ itemCount }: any) =>
      `repeat(${itemCount}, 35%)`};
  }

  @media (min-width: 1200px) {
    grid-template-columns: ${({ itemCount }: any) =>
      `repeat(${itemCount}, 20%)`};
  }
`

const RecipeQueue = ({ recipes }: any) => {
  const handleRemoveClick = (id: string) => {
    removeRecipeFromQueue(id)
  }

  const isEmpty = !recipes || !recipes.length

  return (
    <QueueContainer
      css={css`
        transition: all 0.35s ease;
        padding: ${isEmpty ? '10px 0' : '20px 0'};
        ${isEmpty && 'background: rgba(250, 135, 127, 0.20);'}
      `}
    >
      <div>
        <h2
          css={css`
            padding: 0 10px;
            transition: all 0.35s ease;
            font-size: ${isEmpty ? '1rem' : '1.5rem'};
          `}
        >{`My Queue${
          isEmpty
            ? ' is empty'
            : ` (${recipes.length} item${recipes.length > 1 ? 's' : ''})`
        }`}</h2>
      </div>
      {recipes && recipes.length > 0 && (
        <HorizontalSlider itemCount={recipes.length}>
          {recipes.map((item: any, index: number) => (
            <RecipeCard
              key={index}
              style={{
                scrollSnapAlign: 'center',
                padding: '5px',
              }}
              ctaButton={
                <RemoveButton
                  css={css`
                    position: absolute;
                    top: 5px;
                    right: 5px;
                  `}
                  onClick={() => handleRemoveClick(item.id)}
                />
              }
              {...item}
            />
          ))}
        </HorizontalSlider>
      )}
    </QueueContainer>
  )
}

export default RecipeQueue
