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
import Button from '../Button/Button'
import ShuffleButton from '../Button/ShuffleButton'
import AddButton from '../Button/AddButton'
import RemoveButton from '../Button/RemoveButton'

type Props = RouteComponentProps

const Container = styled.div``

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
`

const CtaButton = styled(ShuffleButton)`
  position: fixed;
  bottom: 6px;
  right: 10px;
  font-size: 0.6rem;
  z-index: 10;
  height: 49px;
  width: 49px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  animation: pulse 2.5s infinite;
  :hover,
  :focus {
    animation: none;
  }

  @keyframes pulse {
    0% {
      box-shadow: inset 0 0 0 0 rgba(154, 97, 244, 0.4);
    }

    70% {
      box-shadow: inset 0 0 0 15px rgba(154, 97, 244, 0);
    }

    100% {
      box-shadow: inset 0 0 0 0 rgba(154, 97, 244, 0);
    }
  }
`

const StyledSearch = styled(Search)`
  display: block;
  background-color: white;
  color: black;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  width: 100%;

  transition: width 0.5s ease, transform 0.25s ease;

  @media (min-width: 640px) {
    width: 40vw;
    width: 100%;
  }

  ::placeholder {
    color: gray;
  }

  text-align: left;
  :focus {
    text-align: left;
    outline: none;
    width: 100%;
  }

  @keyframes hoverEffect {
    0% {
      box-shadow: 0 0px 3px 1px 0px rgba(0, 0, 0, 0.1);
    }
    70% {
      box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
    }
    100% {
      box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
    }
  }
`

const Icon = styled.div`
  background-position: center;
  background-size: cover;
  background-image: ${({ src }: any) => `url(${src})`};
  height: 45px;
  width: 45px;
  transition: transform 0.1s ease;

  :hover {
    transform: rotate(45deg);
  }
`

function Dashboard({ navigate }: Props) {
  const user = useSession()
  const [recipes, setRecipes] = useState()
  const [isRandomViewMode, setRandomViewMode] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [values = []] = useCollectionData(
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
      <Top>
        <CtaButton
          onClick={() => {
            if (values && values.length > 0 && navigate) {
              const randomItem: any =
                values[Math.floor(Math.random() * Math.floor(values.length))]
              navigate(randomItem.id)
              setRandomViewMode(true)
            }
          }}
        />

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
      {values && values.length > 0 ? (
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
          fields={['tags', 'title', 'description', 'ingredients', 'author']}
          onResult={(result: any) => setRecipes(result)}
        />
      )}
      {recipes && userData && recipes.length > 0 && (
        <RecipeList
          recipes={recipes.map((item: any) => ({
            ...item,
            ctaButton:
              userData.queuedRecipeIds &&
              userData.queuedRecipeIds.includes(item.id) ? (
                <RemoveButton
                  css={css`
                    position: absolute;
                    top: 5px;
                    right: 5px;
                  `}
                  onClick={() => removeRecipeFromQueue(item.id)}
                />
              ) : (
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
