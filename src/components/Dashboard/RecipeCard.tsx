/** @jsx jsx */
import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { jsx, css } from '@emotion/core'

import { RecipeType } from './Recipe'

import AddButton from '../Button/AddButton'

type Props = RecipeType & {
  style?: object
  onCtaClick?: Function
  ctaLabel?: string
}

const Container = styled.div``

const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: 75% 25%;
  height: 100%;
  margin: 5px;
  cursor: pointer;

  :hover > div {
    box-shadow: 0 0.5em 0.5em -0.2em rgba(33, 33, 33, 0.2);
  }
`

const CardContent = styled.div`
  width: 95%;
  margin: 0 auto;
  background-color: #fff9f9;
  padding: 10px 15px;
  text-align: center;
  margin-top: -5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
  border-radius: 10px;

  box-shadow: 0 0.5em 0.5em -0.4em rgba(33, 33, 33, 0.2);
`

const CardMedia = styled.div`
  position: relative;
  height: 100%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 50%;
`

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 30px;
  width: 30px;
`

export default function RecipeCard({
  id,
  title,
  ingredients,
  image,
  onCtaClick,
  ctaLabel,
  ...rest
}: Props) {
  const handleCardClick = (e: any) => {
    navigate(
      `${
        window.location.pathname === '/' ? '' : window.location.pathname
      }/${id}`,
    )
  }

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick(id)
    }
  }

  return (
    <Container {...rest}>
      <ContentWrapper onClick={handleCardClick}>
        <div
          css={css`
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0.5em 0.5em -0.4em rgba(33, 33, 33, 0.2);
          `}
        >
          {image && (
            <CardMedia style={{ backgroundImage: `url(${image})` }}>
              {onCtaClick && (
                <AddButton
                  css={css`
                    position: absolute;
                    top: 5px;
                    right: 5px;
                  `}
                  onClick={handleCtaClick}
                />
              )}
            </CardMedia>
          )}
        </div>
        <CardContent>
          <h2 style={{ fontSize: '18px', margin: '0' }}>{title}</h2>
        </CardContent>
      </ContentWrapper>
    </Container>
  )
}
