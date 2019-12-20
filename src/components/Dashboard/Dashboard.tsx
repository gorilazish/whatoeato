/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import { useSession } from '../../auth'
import { db, addRecipeToQueue, removeRecipeFromQueue } from '../../db'

import RecipeList from './RecipeList'
import RecipeQueue from './RecipeQueue'
import CreateRecipe from './CreateRecipe'
import Recipe from './Recipe'
import Search from '../Search/Search'
import AddButton from '../Button/AddButton'
import Header from '../Header/Header'

type Props = RouteComponentProps & {
  user: any
}

const Container = styled.div``

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StyledSearch = styled(Search)`
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: width 0.5s ease, transform 0.25s ease;

  ::placeholder {
    color: gray;
  }

  :focus {
    text-align: left;
    outline: none;
    width: 100%;
  }
`

const SEARCH_FIELDS = ['tags', 'title', 'description', 'ingredients', 'author']

function Dashboard({ navigate }: Props) {
  const user = useSession()
  const [recipes, setRecipes] = useState()
  const [isRandomViewMode, setRandomViewMode] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [values = [], loading] = useCollectionData(
    db
      .collection('recipes')
      .where('userId', '==', user ? user.uid : '')
      .orderBy('updatedAt', 'desc'),
    { idField: 'id' },
  )
  const [userData]: any = useDocumentData(db.collection('users').doc(user!.uid))

  useEffect(() => {
    if (values) {
      setRecipes(values)
    }
  }, [values.length])

  const getRandomRecipeId = () => {
    if (values && values.length > 0) {
      const randomItem: any =
        values[Math.floor(Math.random() * Math.floor(values.length))]
      return randomItem.id
    }
  }

  return (
    <Container>
      <Header
        user={user}
        onCtaClick={() => {
          setRandomViewMode(true)
          navigate!(getRandomRecipeId())
        }}
      />

      <Top>
        <RecipeQueue
          recipes={
            userData &&
            userData.queuedRecipeIds &&
            userData.queuedRecipeIds.map((id: string) =>
              values.find((item: any) => item.id === id),
            )
          }
        />
      </Top>
      <br />
      {!loading && values && values.length > 0 ? (
        <h2>Recipes</h2>
      ) : (
        <div>
          <br />
          <h2>You have no recipes yet 😒</h2>
          <h3>Add recipes by clicking plus in the bottom of the screen</h3>
        </div>
      )}
      {values && values.length > 0 && (
        <StyledSearch
          placeholder={'search food'}
          items={values as any[]}
          fields={SEARCH_FIELDS}
          onResult={(result: any) => setRecipes(result)}
        />
      )}
      {recipes && userData && recipes.length > 0 && (
        <RecipeList
          recipes={recipes.map((item: any) => ({
            ...item,
            ctaButton: userData.queuedRecipeIds &&
              !userData.queuedRecipeIds.includes(item.id) && (
                <AddButton
                  css={css`
                    position: absolute;
                    top: 5px;
                    right: 5px;
                  `}
                  onClick={() => addRecipeToQueue(item.id)}
                />
              ),
          }))}
        />
      )}

      <Router primary={false}>
        <CreateRecipe path='create' />
        <CreateRecipe path=':id/edit' />
        <Recipe
          path=':id'
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
    </Container>
  )
}

export default Dashboard
