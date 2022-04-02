import styled from '@xstyled/styled-components'
import errorIcon from './error.svg'

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  padding: 7em;
`

const Container = styled.div`
  text-align: center;
  & > img {
    width: 150px;
    height: 150px;
  }
`

type Props = {
  error?: Error
}

const Error500Page: React.ComponentType<Props> = ({ error }: Props): JSX.Element => (
  <Wrapper>
    <Container>
      <img src={errorIcon} alt="" />
      {error && <div>{error?.message}</div>}
    </Container>
  </Wrapper>
)

export default Error500Page
