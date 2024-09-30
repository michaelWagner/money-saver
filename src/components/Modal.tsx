interface ModalProps {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, title, isOpen, onClose }) => {
  const closeModal = () => onClose()

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div role='presentation' className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>

        <div role='dialog' className="relative bg-background w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-font text-lg font-semibold">{title}</h3>
            <button
              className="text-font absolute top-2 right-2 p-1 hover:text-font-muted"
              onClick={closeModal}>
              &#x2715;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal