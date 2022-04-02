import { useMutate } from '@inventi/keep'
import Login from './Login'

const initialValues = {
  email: 'user@inventi.cz',
  password: 'in-venti',
}

const LoginContainer = (): JSX.Element => {
  const login = useMutate<{ email: string; password: string }>('user:login', 'user:login')
  return <Login onSubmit={login} defaultValues={initialValues} />
}

export default LoginContainer
