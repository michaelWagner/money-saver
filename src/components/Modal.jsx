import PropTypes from 'prop-types'

const Modal = ({ children, title, isOpen, onClose }) => {
  const closeModal = () => {
    onClose()
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div role='presentation' className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
        <div role='dialog' className="relative bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center border-b p-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={closeModal}>&times;</button>
          </div>
          <div className="p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal