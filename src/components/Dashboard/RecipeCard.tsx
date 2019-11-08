import React from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'

import { RecipeType } from './Recipe'
import Button from '../Button/Button'

type Props = RecipeType & {
  style?: object
  onCtaClick?: Function
  ctaLabel?: string
}

const MyCard = styled.div`
  @media (min-width: 640px) {
    max-width: 345px;
  }
`

const ContentWrapper = styled.div`
  display: grid;
`

const CardContent = styled.div`
  width: 75%;
  margin: 0 auto;
  background-color: #fff9f9;
  margin-top: -40px;
  padding: 10px 15px;
  text-align: center;

  :hover {
    box-shadow: 0 0.5em 0.5em -0.4em rgba(33, 33, 33, 0.2);
    transform: translateY(-0.25em);
  }
`

const CardMedia = styled.div`
  height: 100%;
  padding-top: 75%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
      }/${id}`
    )
  }

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick(id)
    }
  }

  return (
    <MyCard {...rest}>
      <ContentWrapper>
        <div>
          {image && <CardMedia style={{ backgroundImage: `url(${image})` }} />}
        </div>
        <CardContent onClick={handleCardClick}>
          <h2 style={{ fontSize: '18px' }}>{title}</h2>
          <p>{ingredients && ingredients.map(item => item.name).join(' | ')}</p>
        </CardContent>
        {onCtaClick && <Button onClick={handleCtaClick}>{ctaLabel}</Button>}
      </ContentWrapper>
    </MyCard>
  )
}
