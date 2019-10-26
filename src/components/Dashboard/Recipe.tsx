import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { deleteEntry, Ingredient, db } from '../../db'
import { RecipeProps } from './RecipeCard'

import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Modal from '../Modal/Modal'

import '@reach/dialog/styles.css'

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

const StyledDialogOverlay = styled(DialogOverlay)`
  display: flex;
  align-items: flex-end;

  @media (min-width: 640px) {
    display: block;
  }
`
const StyledDialogContent = styled(DialogContent)`
  height: 50vh;
  width: 100%;
  overflow-y: auto;
  margin: 0;

  @media (min-width: 640px) {
    height: 70vh;
    width: 60vh;
    margin: 10vh auto;
  }
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
      } as RecipeProps)
    }
  }, [loading])

  if (!loading && error) return <h1>{String(error)}</h1>

  const handleDeleteClick = () => {
    deleteEntry(id!)
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
    <StyledDialogOverlay isOpen={true} onDismiss={handleCloseRequest}>
      <StyledDialogContent>
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
      </StyledDialogContent>
    </StyledDialogOverlay>
  )
}

export default Recipe
