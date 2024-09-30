import { GoPersonFill } from 'react-icons/go'

interface UserIconProps {
  profileImg?: string
  size?: number
}

const UserIcon: React.FC<UserIconProps> = ({ profileImg, size = 30 }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`flex justify-center bg-font-muted border items-center rounded-full`}>
      {profileImg ? (
        <img
          src={profileImg}
          alt='User Icon'
          className={`block h-[${size}px] w-[${size}px]`}
        />
      ) : (
        <GoPersonFill className={`block h-[${size}px] w-[${size}px] text-font text-font-inverse`} />
      )}
    </div>
  )
}

export default UserIcon