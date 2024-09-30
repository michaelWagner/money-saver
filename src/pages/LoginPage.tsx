import AuthForm from '../components/AuthForm'
import { User } from '../types'

interface LoginPageProps {
  setAuth: (user: User, token: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuth }) => {
  return (
    <div className='h-[80%] content-center'>
      <AuthForm setAuth={setAuth} />
    </div>
  )
}

export default LoginPage
