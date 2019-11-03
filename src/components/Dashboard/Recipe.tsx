import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'

import { deleteRecipe, db } from '../../db'

import { Ingredient } from '../../db'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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

const Recipe = ({ id, navigate, onNext, onBack, onClose }: Props) => {
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
  }, [loading, value])

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
    <Modal isOpen={true} onDismiss={handleCloseRequest}>
      <button onClick={() => navigate && navigate('../')}>CLOSE</button>
      {recipe && (
        <div>
          {recipe.image && (
            <CardMedia
              style={{
                backgroundImage: `url(${recipe.image})`,
                height: 0,
                paddingTop: '25%',
              }}
            />
          )}

          <Typography variant="h5" component="h2">
            {recipe.title}
          </Typography>
          <List dense>
            {recipe.ingredients &&
              recipe.ingredients.map((item: any) => (
                <ListItem key={`${item.name}+${item.amount}`}>
                  <ListItemText primary={item.name} secondary={item.amount} />
                </ListItem>
              ))}
          </List>
          <List>
            {recipe.relatedLinks &&
              recipe.relatedLinks.length > 0 &&
              recipe.relatedLinks.slice(0, 3).map((item: any, index: any) => (
                <a href={item.link} key={index}>
                  <Typography color="textSecondary" gutterBottom>
                    {item.title}
                  </Typography>
                </a>
              ))}
          </List>
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
