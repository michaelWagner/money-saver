import AddFriendForm from '../components/AddFriendForm'
import FriendList from '../components/FriendList'

const FriendsPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <AddFriendForm />
      <FriendList />
    </div>
  )
}

export default FriendsPage
