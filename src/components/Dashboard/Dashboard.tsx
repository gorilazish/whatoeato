import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@material-ui/core'
// @ts-ignore
import { withRouter, Link } from 'react-router-dom'
import { useSession, signOut } from '../../auth'
import RecipeList from './RecipeList'
import Modal from '../Modal/Modal'
import CreateRecipe from './CreateRecipe'

const Container = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Dashboard(props: any) {
  const [show, setShow] = useState(false)
  // @ts-ignore
  const user = useSession()

  async function handleLogoutClick() {
    await signOut()
    props.history.push('/')
  }

  return !user ? (
    <>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </>
  ) : (
      <>
        <Button color="secondary" variant="contained" onClick={() => setShow(!show)}>New</Button>
        <Modal isOpen={show}>
          <Container>
            <div style={{ height: '80vh', width: '80vw', background: 'white' }}>
              <button onClick={() => setShow(false)}>CLOSE</button>
              <CreateRecipe />
            </div>
          </Container>
        </Modal>
        <RecipeList />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleLogoutClick}
        >
          Logout
      </Button>
      </>
    )
}

// @ts-ignore
export default withRouter(Dashboard)
