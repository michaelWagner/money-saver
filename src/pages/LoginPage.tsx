import AuthForm from '../components/AuthForm'

interface LoginPageProps {
  setToken: (token: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ setToken }) => {
  return (
    <div className='h-[80%] content-center'>
      <AuthForm setToken={setToken} />
    </div>
  )
}

export default LoginPage
