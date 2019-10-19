import ReactDOM from 'react-dom'

const Modal = ({ children, isOpen }: any) => {
    const modalRoot = document.getElementById('modal-root');

    return isOpen ?
        ReactDOM.createPortal(
            children,
            modalRoot!,
        ) : null
}

export default Modal