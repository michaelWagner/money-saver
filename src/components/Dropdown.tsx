import { useState, useRef, useEffect } from 'react'
import DropdownButton from './DropdownButton'
import DropdownMenu from './DropdownMenu'
import { DropdownOption } from '../types/DropdownOption'

interface DropdownProps {
  options: DropdownOption[]
  onSelect: (option: any) => void
  value: DropdownOption | null
  onCustomSelect?: () => void
  customOptions?: DropdownOption[]
  placeholder?: string
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  customOptions,
  onSelect,
  onCustomSelect,
  options,
  placeholder,
  value,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: DropdownOption) => {
    if (option?.custom) {
      // Call the custom select handler if the custom option is selected
      onCustomSelect && onCustomSelect()
    } else {
      onSelect(option)
    }
    setIsOpen(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }
  , [])

  const optionsWithCustoms = [...options, ...(customOptions || []).map(option => ({ ...option, custom: true }))]

  return (
    <div className={`relative inline-block bg-input-bg ${className ? className : ''}`}
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
