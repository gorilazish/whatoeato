import React from 'react'
import styled from '@emotion/styled'

import ModalRoot from './ModalRoot'


const Container = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0, .5);
    z-index: 11;
`

const ModalContainer = styled.div`
    height: 70vh;
    width: 80vw;
    background: white;
    padding: 5%;
    overflow: auto;
`

const Modal = ({ children, isOpen }: any) => {
    return isOpen ? (
        <ModalRoot>
            <Container>
                <ModalContainer>
                    {children}
                </ModalContainer>
            </Container>
        </ModalRoot>
    ) : null
}

export default Modal