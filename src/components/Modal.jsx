import PropTypes from 'prop-types'

const Modal = ({ children, title, isOpen, onClose }) => {
  const closeModal = () => {
    onClose()
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div role='presentation' className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>

        <div role='dialog' className="relative bg-gray-800 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              className="absolute top-2 right-2 p-1 hover:text-gray-500"
              onClick={closeModal}>
              &#x2715;
            </button>
          </div>
          <div className='border-b border-gray-500 mt-2 mb-6'></div>
          {children}
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