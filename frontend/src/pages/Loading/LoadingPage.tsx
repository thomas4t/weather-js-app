import styled from '@xstyled/styled-components'
import spinner from './spinner.svg'

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 7em;
  & > img {
    animation-name: example;
    animation-duration: 2s;
  }
  @keyframes example {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const LoadingScreen = (): JSX.Element => (
  <Wrapper>
    <img src={spinner} alt="test" />
  </Wrapper>
)

export default LoadingScreen
