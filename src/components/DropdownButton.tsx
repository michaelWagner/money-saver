interface DropdownButtonProps {
  label: string
  isOpen: boolean
  onClick: () => void
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, isOpen, onClick }) => {
  return (
    <button 
      id="dropdownButton"
      className="w-full flex items-center text-font px-4 py-2 text-left bg-input-bg border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-focus"
      aria-haspopup="true" 
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {label}
      <span className="float-right ml-2">
        <svg 
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </span>
    </button>
  )
}

export default DropdownButton
