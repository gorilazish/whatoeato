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
  ctaButton?: React.ReactNode
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin: 0 auto;
  background-color: #fff9f9;
  padding: 10px 15px;
  margin-top: -16px;
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
  ctaButton,
  prepTime,
  tags,
  ...rest
}: Props) {
  const handleCardClick = (e: any) => {
    const path = `${
      window.location.pathname.replace('/', '') === ''
        ? ''
        : window.location.pathname
    }${
      window.location.pathname[window.location.pathname.length - 1] !== '/'
        ? '/'
        : ''
    }${id}`
    navigate(path)
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
              {ctaButton && ctaButton}
              {prepTime && (
                <div
                  css={css`
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    font-size: 0.8rem;
                    p {
                      margin: 0;
                      padding: 0;
                    }
                  `}
                >
                  <p>{prepTime}</p>
                  <p
                    css={css`
                      font-size: 0.5rem;
                    `}
                  >
                    min.
                  </p>
                </div>
              )}
            </CardMedia>
          )}
        </div>
        <CardContent>
          <h2
            css={css`
              font-size: 1.2rem;
              margin: 0;
              font-weight: normal;
              text-transform: capitalize;
            `}
          >
            {title}
          </h2>
          {tags && (
            <span
              css={css`
                margin-top: 5px;
                font-size: 0.7rem;
                color: darkgray;
              `}
            >
              {tags && tags.join(' | ')}
            </span>
          )}
        </CardContent>
      </ContentWrapper>
    </Container>
  )
}
