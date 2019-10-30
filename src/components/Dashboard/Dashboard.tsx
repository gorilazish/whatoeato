import React, { useState, useEffect } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { useSession } from '../../auth'
import { db } from '../../db'

import RecipeList from './RecipeList'
import { Dialog } from '@reach/dialog'
import CreateRecipe from './CreateRecipe'
import Recipe from './Recipe'
import Search from '../Search/Search'
import Frontpage from '../Frontpage/Frontpage'
import Button from '../Button/Button'
import plus from './plus.png'
import search from './magnifying-glass.png'

type Props = RouteComponentProps

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const AddButton = styled(Button)`
  z-index: 11;
  position: fixed;
  left: 30px;
  bottom: 20px;
  padding: 10px;
  border-radius: 50px;
  border: none;
  opacity: 0.6;

  @media (min-width: 640px) {
    opacity: 0.3;
    bottom: 50px;
    transition: all 0.1s ease-in-out;

    :hover {
      opacity: 0.9;
    }
  }
`

const SearchButton = styled(AddButton)`
  right: 30px;
  left: auto;
  display: flex;
  align-items: center;
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
  const [recipes, setRecipes] = useState([])
  const [isRandomViewMode, setRandomViewMode] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
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
    <Frontpage />
  ) : (
    <>
      <Menu>
        <AddButton onClick={() => navigate && navigate('create')}>
          <Icon style={{ backgroundImage: `url(${plus})` }} />
        </AddButton>
        <SearchButton
          onClick={() => setShowSearch(!showSearch)}
          style={{
            opacity: showSearch && '1',
            backgroundColor: showSearch && 'lightgoldenrodyellow',
          }}
        >
          {values && (
            // @ts-ignore
            <Search
              style={{
                transition: 'all 0.25s ease-in-out',
                width: showSearch ? 'calc(100vw - 160px)' : '0',
                height: '45px',
                visibility: showSearch ? 'visible' : 'hidden',
                padding: 0,
                marginRight: showSearch && '15px',
                'border-bottom-left-radius': '50px',
                'border-top-left-radius': '50px',
                'font-size': '1.2rem',
                'padding-left': showSearch ? '20px' : '0',
              }}
              items={values as any[]}
              fields={['title', 'description', 'ingredients', 'author']}
              onResult={(result: any) => setRecipes(result)}
            />
          )}
          <Icon style={{ backgroundImage: `url(${search})` }} />
        </SearchButton>
        <Button
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
      </Menu>
      <br />

      <RecipeList recipes={recipes} />

      <Router primary={false}>
        <CreateRecipe path="create" />
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
