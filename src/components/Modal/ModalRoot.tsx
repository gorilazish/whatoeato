import ReactDOM from 'react-dom'

const ModalRoot = ({ children }: any) => {
  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    children,
    modalRoot!,
  )
}

export default ModalRoot