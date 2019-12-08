/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import {
  FormControl,
  Input,
  InputLabel,
  InputBase,
  TextField,
} from '@material-ui/core'
import { db } from '../../db'
import config from '../../firebaseConfig'
import { createRecipe, updateRecipe, extractImageSrcFromLink } from '../../db'
import { useSession } from '../../auth'
import Modal from '../Modal/Modal'

import imgPlaceholder from './food-placeholder.png'
import Button from '../Button/Button'
import CategoryToggle from '../Button/CategoryToggle'
import { Category } from './Recipe'

type Props = RouteComponentProps & {
  onClose?: () => void
  id?: string
}

export interface Ingredient {
  name: string
  amount: string
}

const searchGoogleRecipes = async (title: string) => {
  try {
    const searchStringPostfix = 'recipe'
    const url = `https://www.googleapis.com/customsearch/v1?key=${config.googleCustomSearchApiKey}&cx=007051031288274791484:letviqy3cr1&q=${title}%20${searchStringPostfix}`
    const json = await (await fetch(url)).json()
    return json
  } catch (error) {
    console.log(error)
  }
}

const Container = styled.div`
  padding: 20px;

  @media (min-width: 640px) {
    padding: 40px 20px;
    width: 68%;
    margin: 0 auto;
  }
`

const CardMedia = styled.div`
  position: relative;
  height: 100%;
  padding-top: 56.25%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (min-width: 640px) {
    padding-top: 40%;
  }
`

const SliderControl = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const IngredientCard = styled.div`
  margin-top: 10px;
  padding: 15px 30px;
  box-shadow: 0 2px 9px -2px rgba(33, 33, 33, 0.2);
`

const ReturnButton = styled(Button)`
  background: transparent;
  padding: 7px 12px;
  border: 2px solid lightgrey;
  color: lightgrey;
  border-radius: 4px;
  font-size: 0.9rem;

  :hover {
    border-color: darkgray;
    color: darkgray;
  }
`

function CreateRecipe({ onClose, navigate, id }: Props) {
  const [value, loading, error] = useDocumentDataOnce(
    id ? db.doc(`recipes/${id}`) : null,
  )

  const user = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [prepTime, setPrepTime] = useState('')
  const [description, setDescription] = useState('')
  const [recipeLink, setRecipeLink] = useState('')
  const [tags, setTags] = useState<Category[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [currentIngredientName, setCurrentIngredientName] = useState('')
  const [currentIngredientAmount, setCurrentIngredientAmount] = useState('')
  const [relatedLinks, setRelatedLinks] = useState<any[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: '',
      amount: '',
    },
  ])

  useEffect(() => {
    if (id && value) {
      setPrefilledState()
    }
  }, [loading])

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  })

  const setPrefilledState = () => {
    if (value) {
      setTitle(value.title)
      setDescription(value.description)
      setIngredients(value.ingredients)
      setImages([value.image])
      setTags(value.tags || [])
      setPrepTime(value.prepTime || '')
      setRelatedLinks(value.relatedLinks || '')
    }
  }

  const handleUserKeyPress = (e: any) => {
    const { keyCode } = e
    if (keyCode === 13) {
      console.log('enter')
    }
  }

  const handleSubmit = async (e: any) => {
    if (user) {
      setIsSubmitting(true)
      const newRecipe = {
        title,
        userId: user.uid,
        author: user.displayName || '',
        description,
        recipeLink,
        ingredients,
        image: images[activeImageIndex],
        prepTime,
        tags,
        relatedLinks,
      }

      if (id) {
        await updateRecipe(id, newRecipe)
      } else {
        await createRecipe(newRecipe)
      }

      handleCloseRequest()
      setIsSubmitting(false)
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

  const addIngredient = (ingredient: Ingredient) => {
    const inputItem = { name: '', amount: '' }
    const updatedIngredients = [...ingredients].filter(item => item.name !== '')
    setIngredients([...updatedIngredients, ingredient, inputItem])
    setCurrentIngredientName('')
    setCurrentIngredientAmount('')
  }

  const removeIngredient = (ingredient: Ingredient) => {
    const updatedIngredients = [...ingredients].filter(
      item => item.name !== ingredient.name,
    )

    setIngredients(updatedIngredients)
  }

  const handleIngredientActionClick = (ingredient: Ingredient) => (e: any) => {
    e.preventDefault()
    if (
      ingredient.name === '' &&
      currentIngredientName !== '' &&
      currentIngredientAmount !== ''
    ) {
      addIngredient({
        name: currentIngredientName,
        amount: currentIngredientAmount,
      })
    } else if (ingredient.name !== '') {
      removeIngredient(ingredient)
    }
  }

  const handleTitleBlur = async () => {
    if (!title) return
    const relatedGoogleRecipes = await searchGoogleRecipes(title)

    if (relatedGoogleRecipes.items && relatedGoogleRecipes.items.length > 0) {
      const relatedLinks = relatedGoogleRecipes.items
      const recipeImages: string[] = []
      relatedLinks.forEach((item: any) => {
        const image = extractImageSrcFromLink(item)

        if (image) {
          recipeImages.push(image)
        }
      })

      if (recipeImages.length > 0) {
        setImages(recipeImages)
        setRelatedLinks(relatedLinks)
      }
    }
  }

  return (
    <Modal isOpen={true} onDismiss={handleCloseRequest}>
      <form
        // @ts-ignore
        onSubmit={e => e.preventDefault() && false}
      >
        <CardMedia
          style={{
            backgroundImage: `url(${
              images[activeImageIndex]
                ? images[activeImageIndex]
                : imgPlaceholder
            })`,
          }}
        >
          {images[activeImageIndex] && (
            <SliderControl>
              <Button
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  color: 'white',
                }}
                onClick={() =>
                  setActiveImageIndex(
                    activeImageIndex === 0
                      ? images.length - 1
                      : activeImageIndex - 1,
                  )
                }
              >
                Prev
              </Button>
              <Button
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  color: 'white',
                }}
                onClick={() =>
                  setActiveImageIndex(
                    activeImageIndex === images.length - 1
                      ? 0
                      : activeImageIndex + 1,
                  )
                }
              >
                Next
              </Button>
            </SliderControl>
          )}
        </CardMedia>
        <Container>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='name'>Meal title</InputLabel>
            <Input
              autoFocus
              // @ts-ignore
              onBlur={handleTitleBlur}
              id='title'
              name='title'
              autoComplete='off'
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ marginBottom: '50px' }}
            />
          </FormControl>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
              flexDirection: 'column',
            }}
          >
            <h3>Ingredients list</h3>
            {ingredients.map((item, index) => (
              <IngredientCard key={`${item.name}-${index}`}>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <InputBase
                    value={item.name || currentIngredientName}
                    onChange={e => setCurrentIngredientName(e.target.value)}
                    placeholder='Name'
                    disabled={!!item.name}
                  />
                  <InputBase
                    value={item.amount || currentIngredientAmount}
                    onChange={e => setCurrentIngredientAmount(e.target.value)}
                    placeholder='Amount'
                    disabled={!!item.amount}
                  />
                  <ReturnButton onClick={handleIngredientActionClick(item)}>
                    {item.name ? 'Remove' : 'Enter'}
                  </ReturnButton>
                </div>
              </IngredientCard>
            ))}
            <h3>Category</h3>
            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                grid-auto-rows: 80px;
                grid-gap: 10px;
              `}
            >
              {Object.values(Category).map((item, index) => {
                const isActive = tags && tags.includes(item)
                return (
                  <CategoryToggle
                    key={index}
                    active={isActive}
                    css={css`
                      text-transform: capitalize;
                    `}
                    onClick={(e: any) => {
                      e.preventDefault()
                      if (!isActive) {
                        setTags([...tags, item])
                      } else {
                        setTags(
                          tags.filter(selectedTag => item !== selectedTag),
                        )
                      }
                    }}
                  >
                    {item}
                  </CategoryToggle>
                )
              })}
            </div>
            <FormControl
              style={{
                marginTop: '50px',
              }}
            >
              <InputLabel htmlFor='prepTime'>
                Preparation time (minutes)
              </InputLabel>
              <Input
                id='prepTime'
                name='prepTime'
                autoComplete='off'
                value={prepTime}
                type='number'
                onChange={e => setPrepTime(e.target.value)}
              />
            </FormControl>
            <FormControl margin='normal' fullWidth>
              <TextField
                helperText={`${description.length}/500`}
                id='description'
                name='description'
                label='Description'
                multiline
                rows='0'
                rowsMax='10'
                value={description}
                onChange={e => {
                  const text = e.target.value
                  if (text.length <= 500) {
                    setDescription(e.target.value)
                  }
                }}
                margin='normal'
              />
            </FormControl>
            <FormControl margin='normal' fullWidth>
              <InputLabel htmlFor='name'>Recipe link</InputLabel>
              <Input
                id='recipeLink'
                name='recipeLink'
                autoComplete='off'
                value={recipeLink}
                onChange={e => setRecipeLink(e.target.value)}
              />
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              onClick={handleSubmit}
              css={css`
                margin: 0 auto;
                margin-top: 50px;
                width: 30%;
              `}
            >
              {id ? 'Save' : 'Add'}
            </Button>
          </div>
        </Container>
      </form>
    </Modal>
  )
}

export default CreateRecipe
