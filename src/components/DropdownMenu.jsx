import PropTypes from 'prop-types'

const DropdownMenu = ({ options, onSelect }) => {
  return (
    <div 
      id="dropdownMenu"
      className="absolute left-0 w-full mt-2 bg-gray-700 border rounded-lg shadow-lg transition-all duration-300 ease-out"
      role="menu"
      aria-labelledby="dropdownButton"
    >
      {options.map((option, index) => (
        <div 
          key={index} 
          className="block px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-400"
          role="menuitem"
          tabIndex="0"
          aria-selected="false"
          onClick={() => onSelect(option)}
          >
          {option.title}
        </div>
      ))}
    </div>
  )
}

DropdownMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default DropdownMenu
