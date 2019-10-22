import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Link } from '@reach/router'
import { useSession } from '../../auth'
import RecipeList from './RecipeList'
import Modal from '../Modal/Modal'
import CreateRecipe from './CreateRecipe'

function Dashboard(props: any) {
  const [show, setShow] = useState(false)
  // @ts-ignore
  const user = useSession()

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
        onClick={() => setShow(!show)}
      >
        New
      </Button>
      <Modal isOpen={show}>
        <button onClick={() => setShow(false)}>CLOSE</button>
        <CreateRecipe />
      </Modal>
      <br />
      <RecipeList />
    </>
  )
}

export default Dashboard
