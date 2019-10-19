import React, { useState } from 'react'
// @ts-ignore
import { withRouter } from 'react-router-dom'
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Chip,
  InputBase,
  Typography,
  TextField,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { createEntry } from '../../db'
import { useSession } from '../../auth'

type Props = {
  history: any
}

export interface Ingredient {
  name: string
  amount: string
}

function CreateRecipe({ history }: Props) {
  const user = useSession()
  const [title, setTitle] = useState('')
  const [currentIngredientName, setCurrentIngredientName] = useState('')
  const [currentIngredientAmount, setCurrentIngredientAmount] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: '',
      amount: '',
    },
  ])
  const [description, setDescription] = useState('')
  const [recipeLink, setRecipeLink] = useState('')

  const handleSubmit = (e: any) => {
    if (user) {
      const newRecipe = {
        title,
        userId: user.uid,
        author: user.displayName || '',
        description,
        recipeLink,
        ingredients,
      }
      createEntry(newRecipe)
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
      item => item.name !== ingredient.name
    )

    setIngredients(updatedIngredients)
  }

  const handleIngredientActionClick = (ingredient: Ingredient) => () => {
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

  return (
    <form
      // @ts-ignore
      onSubmit={e => e.preventDefault() && false}
    >
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="name">Name that stuff</InputLabel>
        <Input
          id="title"
          name="title"
          autoComplete="off"
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: '50px' }}
        />
      </FormControl>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '100px',
          flexDirection: 'column',
        }}
      >
        <Typography component="h2" variant="h6" gutterBottom>
          Ingredients list
        </Typography>
        {ingredients.map((item, index) => (
          <Chip
            key={`${item.name}-${indexedDB}`}
            // avatar={
            //   <Avatar
            //     alt="Natacha"
            //     src="https://res.cloudinary.com/teepublic/image/private/s--hpEAW5us--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_fffffe,e_outline:48/co_fffffe,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1502933243/production/designs/1827343_0.jpg"
            //   />
            // }
            label={
              // item.name ? (
              //   <div>
              //     <p>{`${item.name} - ${item.amount}`}</p>
              //   </div>
              // ) :

              <div
                style={{
                  display: 'flex',
                }}
              >
                <InputBase
                  value={item.name || currentIngredientName}
                  onChange={e => setCurrentIngredientName(e.target.value)}
                  placeholder="Name"
                  disabled={!!item.name}
                />
                <InputBase
                  value={item.amount || currentIngredientAmount}
                  onChange={e => setCurrentIngredientAmount(e.target.value)}
                  placeholder="Amount"
                  disabled={!!item.amount}
                />
              </div>
            }
            onDelete={handleIngredientActionClick(item)}
            deleteIcon={item.name ? undefined : <DoneIcon />}
            style={{ height: '100%', marginBottom: '15px', padding: '5px' }}
          />
        ))}

        <FormControl margin="normal" fullWidth>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows="4"
            rowsMax="10"
            value={description}
            onChange={e => setDescription(e.target.value)}
            margin="normal"
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="name">Recipe link</InputLabel>
          <Input
            id="recipeLink"
            name="recipeLink"
            autoComplete="off"
            autoFocus
            value={recipeLink}
            onChange={e => setRecipeLink(e.target.value)}
            style={{ marginBottom: '50px' }}
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Add
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={history.goBack}
      >
        Back
      </Button>
    </form>
  )
}

export default withRouter(CreateRecipe)
