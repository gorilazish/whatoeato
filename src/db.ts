import * as firebase from 'firebase/app'
// @ts-ignore
import debug from 'debug'
import 'firebase/firestore'
import 'firebase/auth'
import config from './firebaseConfig'

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

export const createEntry = (options: RecipeOptions) => {
  log('save recipe: %o', options)
  return db.collection('recipes').add({
    ...options,
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  })
}

export const deleteEntry = (id: string) => {
  log('delete: %s', id)
  return db
    .collection('recipes')
    .doc(id)
    .delete()
}
