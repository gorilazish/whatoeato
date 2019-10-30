import React from 'react'
import styled from '@emotion/styled'
import { DialogOverlay, DialogContent } from '@reach/dialog'

const StyledDialogOverlay = styled(DialogOverlay)`
  display: flex;
  align-items: flex-end;
  z-index: 12;

  @media (min-width: 640px) {
    display: block;
  }
`

const StyledDialogContent = styled(DialogContent)`
  height: 60vh;
  width: 100%;
  overflow-y: auto;
  margin: 0;

  @media (min-width: 640px) {
    height: 70vh;
    width: 60vh;
    margin: 10vh auto;
  }
`

const Modal = ({ children, isOpen, onDismiss }: any) => {
  return (
    <StyledDialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <StyledDialogContent>{children}</StyledDialogContent>
    </StyledDialogOverlay>
  )
}

export default Modal
