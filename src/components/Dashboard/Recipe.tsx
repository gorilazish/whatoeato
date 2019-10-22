import React from 'react'
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
}

const CardMedia = styled.div`
  height: 100%;
  padding-top: 75%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const Recipe = ({ id, navigate }: Props) => {
  const [value, loading, error] = useDocumentDataOnce(db.doc(`recipes/${id}`))
  if (loading) return null
  if (!loading && error) return <h1>{String(error)}</h1>

  const {
    image,
    title,
    ingredients,
    relatedLinks,
    description,
  }: RecipeProps = value

  const handleDeleteClick = () => {
    deleteEntry(id!)
  }

  const handleCloseRequest = () => {
    if (navigate) {
      navigate('../')
    }
  }
  return (
    <Dialog isOpen={!!value} onDismiss={handleCloseRequest}>
      {image && (
        <CardMedia
          style={{
            backgroundImage: `url(${image})`,
            height: 0,
            paddingTop: '25%',
          }}
        />
      )}

      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <List dense>
        {ingredients &&
          ingredients.map(item => (
            <ListItem key={`${item.name}+${item.amount}`}>
              <ListItemText primary={item.name} secondary={item.amount} />
            </ListItem>
          ))}
      </List>
      <List>
        {relatedLinks &&
          relatedLinks.length > 0 &&
          relatedLinks.slice(0, 3).map((item, index) => (
            <a href={item.link} key={index}>
              <Typography color="textSecondary" gutterBottom>
                {item.title}
              </Typography>
            </a>
          ))}
      </List>
      <Typography>{description}</Typography>
      <IconButton aria-label="delete" onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Dialog>
  )
}

export default Recipe
