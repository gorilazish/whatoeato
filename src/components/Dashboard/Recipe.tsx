/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import { deleteRecipe, db, extractImageSrcFromLink } from '../../db'

import { Ingredient } from '../../db'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Modal from '../Modal/Modal'

import '@reach/dialog/styles.css'
import Button from '../Button/Button'

export type RecipeType = {
  id: string
  title: string
  description?: string
  recipeLink?: string
  image?: string
  author: string
  ingredients?: Ingredient[]
  relatedLinks?: any[]
  tags?: Category[]
  prepTime?: string
}

export enum Category {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  DESSERT = 'dessert',
  SOUP = 'soup',
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

  @media (min-width: 640px) {
    padding-top: 40%;
  }
`

const MediaOverlay = styled.div`
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
`

const BorderContainer = styled.div`
  border: 2px solid white;
  padding: 15px 25px;
  text-align: left;

  p {
    margin: 0;
    font-weight: bold;
  }
`

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: white;
`

const BottomCtaButton = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 60px;
  z-index: 1;
`

const Recipe = ({ id, navigate, onNext, onBack, onClose }: Props) => {
  const [value, loading, error] = useDocumentDataOnce(db.doc(`recipes/${id}`))

  if (!loading && error) return <h1>{String(error)}</h1>

  const handleDeleteClick = async () => {
    await deleteRecipe(id!)
    if (navigate) {
      navigate('../', { replace: true })
    }
  }

  const handleEditClick = () => {
    if (navigate) {
      navigate('edit', { replace: true })
    }
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
    <Modal
      isOpen={true}
      onDismiss={handleCloseRequest}
      css={css`
        position: relative;
      `}
    >
      {onBack && (
        <BottomCtaButton animate={false} onClick={onBack}>
          BACK
        </BottomCtaButton>
      )}
      {onNext && (
        <BottomCtaButton
          css={css`
            left: auto;
            right: 0;
          `}
          onClick={onNext}
          animate={false}
        >
          NEXT
        </BottomCtaButton>
      )}
      {value && (
        <div>
          <div
            css={css`
              color: white;
              position: relative;
            `}
          >
            {value.image && (
              <CardMedia
                css={css`
                  background-image: url(${value.image});
                  transition: filter 0.45s ease-in-out;
                  filter: brightness(60%);
                `}
              />
            )}

            <MediaOverlay>
              <Title>{value.title}</Title>
              {value.ingredients && (
                <BorderContainer>
                  {value.ingredients.map((item: any, index: number) => (
                    <p key={index}>
                      {item.name} - {item.amount}
                    </p>
                  ))}
                </BorderContainer>
              )}
            </MediaOverlay>
          </div>

          <div
            css={css`
              padding: 20px 40px 60px;
            `}
          >
            {value.description && [
              <h3 key={'1'}>Description</h3>,
              <p
                key={'2'}
                css={css`
                  margin: 40px 0;
                `}
              >
                {value.description}
              </p>,
            ]}
            <h3>Similar recipes</h3>
            <div
              css={css`
                display: grid;
                grid-gap: 10px;
              `}
            >
              {value.relatedLinks &&
                value.relatedLinks.length > 0 &&
                value.relatedLinks.slice(0, 3).map((item: any, index: any) => (
                  <a
                    href={item.link}
                    key={index}
                    css={css`
                      display: grid;
                      grid-template-columns: 40% 60%;
                      text-decoration: none;
                    `}
                  >
                    <CardMedia
                      css={css`
                        background-image: url(${extractImageSrcFromLink(item)});
                      `}
                    />
                    <p
                      css={css`
                        padding: 0 10px;
                        font-size: 0.9rem;
                        color: black;
                      `}
                    >
                      {item.title}
                    </p>
                  </a>
                ))}
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                padding: 20px;
              `}
            >
              <IconButton aria-label='delete' onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label='delete' onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default Recipe
