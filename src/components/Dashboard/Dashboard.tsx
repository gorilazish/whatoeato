import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps, Router } from '@reach/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { useSession } from '../../auth'
import { db } from '../../db'

import { Button } from '@material-ui/core'
import RecipeList from './RecipeList'
import { Dialog } from '@reach/dialog'
import CreateRecipe from './CreateRecipe'
import Recipe from './Recipe'
import Search from '../Search/Search'

type Props = RouteComponentProps

function Dashboard({ navigate }: Props) {
  const user = useSession()
  const [recipes, setRecipes] = useState([])
  const [isRandomViewMode, setRandomViewMode] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [values, loading, error] = useCollectionData(
    db
      .collection('recipes')
      .where('userId', '==', user ? user.uid : '')
      .orderBy('title', 'asc'),
    { idField: 'id' }
  )

  useEffect(() => {
    if (values) {
      // @ts-ignore
      setRecipes(values)
    }
  }, [loading])

  const getRandomRecipeId = () => {
    if (values && values.length > 0) {
      const randomItem: any =
        values[Math.floor(Math.random() * Math.floor(values.length))]
      return randomItem.id
    }
  }
  return !user ? (
    <>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
    </>
  ) : (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setShowCreateModal(!showCreateModal)}
      >
        New
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          if (values && values.length > 0 && navigate) {
            const randomItem: any =
              values[Math.floor(Math.random() * Math.floor(values.length))]
            navigate(randomItem.id)
            setRandomViewMode(true)
          }
        }}
      >
        I want to eat!
      </Button>
      <Dialog isOpen={showCreateModal}>
        <button onClick={() => setShowCreateModal(false)}>CLOSE</button>
        <CreateRecipe />
      </Dialog>
      <br />
      {values && (
        <Search
          items={values as any[]}
          fields={['title', 'description', 'ingredients', 'author']}
          onResult={(result: any) => setRecipes(result)}
        />
      )}
      <RecipeList recipes={recipes} />

      <Router primary={false}>
        <Recipe
          path=":id"
          onClose={() => {
            setRandomViewMode(false)
          }}
          onBack={
            isRandomViewMode
              ? () => {
                  window.history.back()
                }
              : undefined
          }
          onNext={
            isRandomViewMode
              ? () => {
                  navigate && navigate(getRandomRecipeId())
                }
              : undefined
          }
        />
      </Router>
    </>
  )
}

export default Dashboard
