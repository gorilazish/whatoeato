import React from 'react'
// @ts-ignore
import {
  useCollectionData,
  useCollection,
} from 'react-firebase-hooks/firestore'
import { db } from '../../db'
import { useSession } from '../../auth'
import Recipe from './Recipe'

export default function RecipeList() {
  const user = useSession()
  const [values, loading, error] = useCollectionData(
    db
      .collection('recipes')

      .where('userId', '==', user!.uid)
      .orderBy('title', 'asc'),
    { idField: 'id' }
  )
  console.log(values)

  // @ts-ignore
  const userRecipes: any[] = values
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '10px',
      }}
    >
      {userRecipes &&
        userRecipes.length > 0 &&
        userRecipes.map((item, index) => (
          <Recipe key={index} id={item.id} title={item.title} {...item} />
        ))}
    </div>
  )
}
