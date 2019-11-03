import React, { useContext } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { createUser } from './db'
import { UserContext } from './UserContext'

export const useSession = () => {
  const { user } = useContext(UserContext)
  return user
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser
    return { initializing: !user, user }
  })

  function onChange(user: any) {
    setState({ initializing: false, user })
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

export const loginWithEmail = (email: string, password: string) => {
  try {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const createUserWithEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userData = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    // Create user object in DB
    if (userData.user) {
      await createUser(userData.user.uid, { name })
    }

    // @ts-ignore
    return firebase.auth().currentUser.updateProfile({
      displayName: name,
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getCurrentUsername = () => {
  const auth = firebase.auth()
  return auth.currentUser && auth.currentUser.displayName
}

export const getCurrentUser = () => {
  const currentUser = firebase.auth().currentUser
  return currentUser
}

export const signOut = () => firebase.auth().signOut()
