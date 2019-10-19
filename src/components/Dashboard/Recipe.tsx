import React, { useState } from 'react'
import styled from '@emotion/styled'

import { deleteEntry, Ingredient } from '../../db'

import { makeStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const MyCard = styled.div`
  border: 1px solid black;
  max-width: 345px;
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
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDeleteClick = () => {
    deleteEntry(id)
  }

  return (
    <MyCard>
      {image && <CardMedia className={classes.media} image={image} />}
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Author - {author}</Typography>
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
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {item.title}
                  </Typography>
                </a>
              ))}
          </List>
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </MyCard>
  )
}
