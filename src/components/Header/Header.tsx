/** @jsx jsx */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { jsx, css } from '@emotion/core'

import Burger from '../Button/Burger'
import Menu from '../Menu/Menu'
import AddButton from '../Button/AddButton'
import ShuffleButton from '../Button/ShuffleButton'

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.75);
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding: 10px 20px;
`

const Utils = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CtaButton = styled(ShuffleButton)`
  font-size: 0.6rem;
  height: 50px;
  width: auto;
  box-shadow: 0 0 0 0 rgba(254, 203, 214, 1);
  animation: pulse 2.5s infinite;
  :hover,
  :focus {
    animation: none;
  }

  @keyframes pulse {
    0% {
      box-shadow: inset 0 0 0 0 rgba(254, 203, 214, 0.4);
    }

    70% {
      box-shadow: inset 0 0 0 15px rgba(254, 203, 214, 0);
    }

    100% {
      box-shadow: inset 0 0 0 0 rgba(254, 203, 214, 0);
    }
  }
`

export default function Header({ user, onCtaClick }: any) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <Container>
      <ContentWrapper>
        <Utils
          css={css`
            justify-content: flex-start;
          `}
        >
          <Burger
            onClick={() => setMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
          />
        </Utils>

        {user && (
          <Utils>
            <AddButton
              style={{ background: 'transparent' }}
              onClick={() => navigate('create')}
            />
          </Utils>
        )}
        {user && (
          <Utils
            css={css`
              justify-content: flex-end;
            `}
          >
            <CtaButton onClick={onCtaClick} />
          </Utils>
        )}
      </ContentWrapper>
      <Menu isOpen={isMenuOpen} onRequestClose={() => setMenuOpen(false)} />
    </Container>
  )
}
