import { GoChevronDown, GoChevronUp } from "react-icons/go"

interface DropdownButtonProps {
  label: string
  isOpen: boolean
  onClick: () => void
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, isOpen, onClick }) => {
  return (
    <button 
      id="dropdownButton"
      className="w-full flex items-center justify-between text-font px-4 py-2 text-left bg-input-bg border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-input-focus"
      aria-haspopup="true" 
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {label}
      <span className="float-right ml-2">
        {isOpen ? <GoChevronUp /> : <GoChevronDown /> }
      </span>
    </button>
  )
}

export default DropdownButton
