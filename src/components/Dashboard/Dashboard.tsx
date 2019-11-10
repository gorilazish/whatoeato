import React, { useState, useEffect } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import styled from '@emotion/styled'

import { useSession } from '../../auth'
import { db, addRecipeToQueue, removeRecipeFromQueue } from '../../db'

import RecipeList from './RecipeList'
import RecipeQueue from './RecipeQueue'
import CreateRecipe from './CreateRecipe'
import Recipe from './Recipe'
import Search from '../Search/Search'
import Button from '../Button/Button'
import plus from './plus.png'
import search from './magnifying-glass.png'

type Props = RouteComponentProps

const Container = styled.div``

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const CtaButton = styled(Button)`
  margin: 10px 0 20px;
  border: none;
  background-color: white;
  padding: 25px 15px;
  font-family: inherit;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  animation: pulse-black 2.5s infinite;
  width: 100%;
  :hover,
  :focus {
    animation: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 640px) {
    width: 35vw;
  }

  @keyframes pulse-black {
    0% {
      box-shadow: 0 0 0 0 rgba(154, 97, 244, 0.2);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(154, 97, 244, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(154, 97, 244, 0);
    }
  }
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

const StyledSearch = styled(Search)`
  background-color: white;
  color: black;
  margin: 50px auto 30px;
  padding: 25px 15px;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.1);
  width: 40vw;
  transition: width 0.5s ease, transform 0.25s ease;
  display: none;

  @media (min-width: 640px) {
    display: inherit;
  }

  ::placeholder {
    color: gray;
  }

  :focus {
    outline: none;
    width: 80%;
    animation: hoverEffect 0.25s;
    animation-fill-mode: forwards;
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

const SearchButton = styled(AddButton)`
  right: 30px;
  left: auto;
  display: flex;
  align-items: center;
  display: none;

  @media (max-width: 640px) {
    display: inherit;
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
    { idField: 'id' }
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
        >
          I want to eat!
        </CtaButton>

        <RecipeQueue
          recipes={
            userData &&
            userData.queuedRecipeIds &&
            userData.queuedRecipeIds.map((id: string) =>
              values.find((item: any) => item.id === id)
            )
          }
        />

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
            <Search
              style={{
                transition: 'all 0.25s ease-in-out',
                width: showSearch ? 'calc(100vw - 160px)' : '0',
                height: '45px',
                visibility: showSearch ? 'visible' : 'hidden',
                padding: 0,
                marginRight: showSearch && '15px',
                borderBottomLeftRadius: '50px',
                borderTopLeftRadius: '50px',
                fontSize: '1.2rem',
                paddingLeft: showSearch ? '20px' : '0',
              }}
              items={values as any[]}
              fields={['title', 'description', 'ingredients', 'author']}
              onResult={(result: any) => setRecipes(result)}
            />
          )}
          <Icon style={{ backgroundImage: `url(${search})` }} />
        </SearchButton>
      </Top>
      <br />
      <h2>Recipes</h2>
      {values && (
        <StyledSearch
          placeholder={'search food'}
          items={values as any[]}
          fields={['title', 'description', 'ingredients', 'author']}
          onResult={(result: any) => setRecipes(result)}
        />
      )}
      {recipes && userData && recipes.length > 0 && (
        <RecipeList
          recipes={recipes.map((item: any) => ({
            ...item,
            onCtaClick: userData.queuedRecipeIds.includes(item.id)
              ? () => removeRecipeFromQueue(item.id)
              : () => addRecipeToQueue(item.id),
          }))}
        />
      )}

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
    </Container>
  )
}

export default Dashboard
