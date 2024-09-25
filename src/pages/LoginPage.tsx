import AuthForm from '../components/AuthForm'

interface LoginPageProps {
  setToken: (token: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ setToken }) => {
  return (
    <div>
      <AuthForm setToken={setToken} />
    </div>
  )
}

export default LoginPage
