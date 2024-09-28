import { DropdownOption } from '../types'

interface DropdownMenuProps {
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect }) => {
  return (
    <div 
      id="dropdownMenu"
      className="absolute left-0 w-full mt-2 bg-background border rounded-lg shadow-lg transition-all duration-300 ease-out"
      role="menu"
      aria-labelledby="dropdownButton"
    >
      {options.map((option, index) => (
        <div 
          key={index} 
          className={`block px-4 py-2 text-sm text-font cursor-pointer ${
            index === 0 ? 'rounded-tl-lg rounded-tr-lg' : '' } ${
            index === options.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''
          } hover:bg-muted`}
          role="menuitem"
          tabIndex={0}
          aria-selected="false"
          onClick={() => onSelect(option)}
          >
          {option.title}
        </div>
      ))}
    </div>
  )
}

export default DropdownMenu
