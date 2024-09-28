import { useState } from 'react'

interface ToggleProps {
  value?: boolean
  onChange: () => void
}

const Toggle: React.FC<ToggleProps> = ({ value = false, onChange }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(value)

  const toggle = () => {
    setIsEnabled(!isEnabled)
    onChange()
  }

  return (
    <label className="toggle-wrapper box-border block" htmlFor="toggle">
      <div className={
        `bg-font border border-input-hover shadow-sm
         box-border h-8 w-[66px] rounded-full px-[4px] py-[3px] relative
         cursor-pointer focus:outline-none focus:ring-1 focus:ring-input-focus
         before:content-[''] before:block before:h-6 before:w-6
         before:rounded-full before:bg-font-inverse before:absolute
         before:z-10 before:transform before:translate-x-0 before:transition-transform ${
        isEnabled ? 'before:translate-x-8' : 'before:translate-x-0'}`
      }>
        <span className="absolute overflow-hidden h-[1px] w-[1px] whitespace-nowrap">
          {isEnabled ? "Enable" : "Disable"}
        </span>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          className='absolute top-0 opacity-0'
          checked={isEnabled}
          onChange={toggle}
        />
      </div>
    </label>
  )
}

export default Toggle