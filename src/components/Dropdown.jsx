import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import DropdownButton from './DropdownButton'
import DropdownMenu from './DropdownMenu'

const Dropdown = ({ placeholder, options, customOptions, onSelect, onCustomSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionTitle, setSelectedOptionTitle] = useState(value?.title || placeholder || 'Select an option')
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option) => {
    if (option.custom) {
      // Call the custom select handler if the custom option is selected
      onCustomSelect()
    } else {
      setSelectedOptionTitle(option?.title)
      onSelect(option)
      setIsOpen(false)
    }
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const optionsWithCustoms = [...options, ...customOptions.map(option => ({ ...option, custom: true }))]

  return (
    <div className="relative inline-block w-full"
      ref={dropdownRef} 
    >
      <DropdownButton 
        label={selectedOptionTitle} 
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.object,
  onCustomSelect: PropTypes.func, // Handle custom option
  customOptions: PropTypes.array,
  placeholder: PropTypes.string,
}

export default Dropdown
