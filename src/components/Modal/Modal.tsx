import React from 'react'
import styled from '@emotion/styled'
import { DialogOverlay, DialogContent } from '@reach/dialog'

const StyledDialogOverlay = styled(DialogOverlay)`
  display: block;
  z-index: 12;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

const MobileContentSpacer = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: block;
    height: 45vh;
    width: 100vw;
    background: transparent;
  }
`

const StyledDialogContent = styled(DialogContent)`
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background: white;

  @media (min-width: 640px) {
    height: 70vh;
    width: 60vh;
    margin: 10vh auto;
  }
`

const Modal = ({ children, isOpen, onDismiss, style }: any) => {
  return (
    <StyledDialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <MobileContentSpacer />
      <StyledDialogContent style={style}>{children}</StyledDialogContent>
    </StyledDialogOverlay>
  )
}

export default Modal
