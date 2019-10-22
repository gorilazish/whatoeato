import React from 'react'
import styled from '@emotion/styled'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { db } from '../../db'
import { useSession } from '../../auth'
import RecipeCard from './RecipeCard'

const GridList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 35px;
  }
`

export default function RecipeList() {
  const user = useSession()
  const [values, loading, error] = useCollectionData(
    db
      .collection('recipes')
      .where('userId', '==', user!.uid)
      .orderBy('title', 'asc'),
    { idField: 'id' }
  )

  // @ts-ignore
  const userRecipes: any[] = values
  return (
    <GridList>
      {userRecipes &&
        userRecipes.length > 0 &&
        userRecipes.map((item, index) => (
          <RecipeCard key={index} id={item.id} title={item.title} {...item} />
        ))}
    </GridList>
  )
}
