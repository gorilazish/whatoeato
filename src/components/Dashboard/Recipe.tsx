/** @jsx jsx */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'
import { useInView } from 'react-intersection-observer'
import { jsx, css } from '@emotion/core'

import { deleteRecipe, db } from '../../db'

import { Ingredient } from '../../db'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Modal from '../Modal/Modal'

import '@reach/dialog/styles.css'

export type RecipeType = {
  id: string
  title: string
  description?: string
  recipeLink?: string
  image?: string
  author: string
  ingredients?: Ingredient[]
  relatedLinks?: any[]
  mealCategory?: string[]
}

type Props = RouteComponentProps & {
  id?: string
  onNext?: () => void
  onBack?: () => void
  onClose?: () => void
}

const CardMedia = styled.div`
  height: 100%;
  padding-top: 75%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: white;
`

const Recipe = ({ id, navigate, onNext, onBack, onClose }: Props) => {
  const [ref, inView] = useInView({
    threshold: 0.95,
  })
  const [value, loading, error] = useDocumentDataOnce(db.doc(`recipes/${id}`))
  const [recipe, setRecipe] = useState()
  useEffect(() => {
    if (!!value) {
      setRecipe({
        image: value.image,
        title: value.title,
        description: value.description,
        ingredients: value.ingredients,
        relatedLinks: value.relatedLinks,
      } as RecipeType)
    }
  }, [loading])

  if (!loading && error) return <h1>{String(error)}</h1>

  const handleDeleteClick = () => {
    deleteRecipe(id!)
  }

  const handleCloseRequest = () => {
    if (onClose) {
      onClose()
    }
    if (navigate) {
      navigate('../')
    }
  }
  return (
    <Modal isOpen={!!recipe} onDismiss={handleCloseRequest}>
      {/* <button onClick={() => navigate && navigate('../')}>CLOSE</button> */}

      {recipe && (
        <div ref={ref}>
          <div
            css={css`
              color: white;
              position: relative;
            `}
          >
            {recipe.image && (
              <CardMedia
                css={css`
                  background-image: url(${recipe.image});
                  transition: filter 0.45s ease-in-out;
                  filter: ${inView
                    ? 'brightness(50%) blur(1px)'
                    : 'brightness(100%)'};
                `}
              />
            )}
            <div
              css={css`
                color: white;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                transition: opacity 0.15s ease 0.1s;
                opacity: ${inView ? 1 : 0};
              `}
            >
              <Title>{recipe.title}</Title>
              <div
                css={css`
                  border: 2px solid white;
                  padding: 15px 25px;
                  text-align: left;

                  p {
                    margin: 0;
                    font-weight: bold;
                  }
                `}
              >
                {recipe.ingredients &&
                  recipe.ingredients.map((item: any, index: number) => (
                    <p key={index}>
                      {item.name} - {item.amount}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <ul>
            {recipe.relatedLinks &&
              recipe.relatedLinks.length > 0 &&
              recipe.relatedLinks.slice(0, 3).map((item: any, index: any) => (
                <a href={item.link} key={index}>
                  <Typography color="textSecondary" gutterBottom>
                    {item.title}
                  </Typography>
                </a>
              ))}
          </ul>
          <Typography>{recipe.description}</Typography>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {onBack && <button onClick={onBack}>BACK</button>}
      {onNext && <button onClick={onNext}>NEXT</button>}
    </Modal>
  )
}

export default Recipe
