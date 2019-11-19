import * as firebase from 'firebase/app'
// @ts-ignore
import debug from 'debug'
import 'firebase/firestore'
import 'firebase/auth'
import config from './firebaseConfig'
import { getCurrentUser } from './auth'

const log = debug('app:db')

firebase.initializeApp(config)

export const db = firebase.firestore()

db.enablePersistence().catch(function(err) {
  console.error(err)
})

export interface RecipeOptions {
  title: string
  userId: string
  description?: string
  recipeLink?: string
  image?: string
  author: string
  ingredients?: Ingredient[]
}

export interface Ingredient {
  name: string
  amount: string
}

export const createUser = (id: string, userObject: any) => {
  return db
    .collection('users')
    .doc(id)
    .set(userObject)
    .catch(err => console.log(err))
}

export const createRecipe = (options: RecipeOptions) => {
  log('save recipe: %o', options)
  return db.collection('recipes').add({
    ...options,
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  })
}

export const deleteRecipe = (id: string) => {
  log('delete: %s', id)
  return db
    .collection('recipes')
    .doc(id)
    .delete()
}

export const updateRecipe = (id: string, options: RecipeOptions) => {
  log('update recipe: %o', options)
  return db
    .collection('recipes')
    .doc(id)
    .set(
      {
        ...options,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      },
      { merge: true },
    )
}

export const addRecipeToQueue = async (recipeId: string) => {
  const user = getCurrentUser()

  if (user) {
    const userDoc = await db.collection('users').doc(user.uid)
    return userDoc.update({
      queuedRecipeIds: firebase.firestore.FieldValue.arrayUnion(recipeId),
    })
  }
}

export const removeRecipeFromQueue = async (recipeId: string) => {
  const user = getCurrentUser()

  if (user) {
    const userDoc = await db.collection('users').doc(user.uid)
    return userDoc.update({
      queuedRecipeIds: firebase.firestore.FieldValue.arrayRemove(recipeId),
    })
  }
}

export const extractImageSrcFromLink = (item: any) => {
  let image
  if (item.pagemap) {
    if (item.pagemap.cse_thumbnail) {
      image = item.pagemap.cse_thumbnail[0].src
    }
    if (item.pagemap.cse_image) {
      image = item.pagemap.cse_image[0].src
    }
    if (item.pagemap.image) {
      image = item.pagemap.image[0].src
    }
  }

  if (image) {
    return image
  }

  return undefined
}
