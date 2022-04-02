import styled from '@xstyled/styled-components'
import Page from '@components/blocks/Page'
import LoginForm, { Props as FormProps } from './components/LoginForm'

type Props = FormProps

const Container = styled.div`
  width: 50%;
  margin: auto;
`

const Login = (props: Props): JSX.Element => (
  <Page>
    <Container>
      <LoginForm {...props} />
    </Container>
  </Page>
)

export default Login
