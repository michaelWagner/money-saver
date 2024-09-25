import PropTypes from 'prop-types'

const DropdownButton = ({ label, isOpen, onClick }) => {
  return (
    <button 
      id="dropdownButton"
      className="w-full text-white px-4 py-2 text-left bg-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-haspopup="true" 
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {label}
      <span className="float-right">
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

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default DropdownButton
