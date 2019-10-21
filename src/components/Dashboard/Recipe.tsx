import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { deleteEntry, Ingredient } from '../../db'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Modal from '../Modal/Modal'

const MyCard = styled.div`
  max-width: 345px;
  width: 100%;
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

type RecipeProps = {
  id: string
  title: string
  description?: string
  recipeLink?: string
  image?: string
  author: string
  ingredients?: Ingredient[]
  relatedLinks?: any[]
  style?: object
}

export default function Recipe({
  id,
  title,
  author,
  ingredients,
  description,
  image,
  relatedLinks = [],
  style,
}: RecipeProps) {
  const [isFullViewOpen, setIsFullViewOpen] = useState(false)

  const handleCardClick = () => {
    setIsFullViewOpen(!isFullViewOpen)
  }

  const handleDeleteClick = () => {
    deleteEntry(id)
  }

  return (
    <MyCard>
      <ContentWrapper>
        <div>
          {image && <CardMedia style={{ backgroundImage: `url(${image})` }} />}
        </div>
        <CardContent onClick={handleCardClick}>
          <h2 style={{ fontSize: '18px' }}>{title}</h2>
        </CardContent>
      </ContentWrapper>

      <Modal isOpen={isFullViewOpen}>
        <button onClick={handleCardClick}>CLOSE</button>
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
          {relatedLinks.length > 0 &&
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
      </Modal>
    </MyCard>
  )
}
