import { useState, useRef, useEffect } from 'react'
import DropdownButton from './DropdownButton'
import DropdownMenu from './DropdownMenu'
import { DropdownOption } from '../types/DropdownOption'

interface DropdownProps {
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  value: DropdownOption | null
  onCustomSelect?: () => void
  customOptions?: DropdownOption[]
  placeholder?: string
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, customOptions, onSelect, onCustomSelect, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOptionTitle, setSelectedOptionTitle] = useState<string>(placeholder || 'Select an option')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: DropdownOption) => {
    if (option?.custom) {
      // Call the custom select handler if the custom option is selected
      onCustomSelect && onCustomSelect()
    } else {
      setSelectedOptionTitle(option?.title)
      onSelect(option)
      setIsOpen(false)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  // Update the selected option title when the value prop changes
  useEffect(() => {
    if (value) {
      setSelectedOptionTitle(value.title)
    }
  }, [value])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }
  , [])

  const optionsWithCustoms = [...options, ...(customOptions || []).map(option => ({ ...option, custom: true }))]

  return (
    <div className="relative inline-block w-full"
      ref={dropdownRef} 
    >
      <DropdownButton 
        label={value?.title || placeholder || 'Select an option'}
        isOpen={isOpen} 
        onClick={toggleDropdown} 
      />
      {isOpen && (
        <DropdownMenu 
          options={optionsWithCustoms} 
          onSelect={handleSelect} 
        />
      )}
    </div>
  )
}

export default Dropdown
