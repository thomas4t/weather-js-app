import styled from '@xstyled/styled-components'
import LoadingBoundary from '@components/elements/LoadingBoundary'
import Error500 from '@pages/Error500'
import Loading from '@pages/Loading'

export type Props = {
  children: React.ReactNode
  isLoading?: boolean
  error?: string
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 10px auto 0;
`

const Page = ({ children, isLoading, error }: Props): JSX.Element => (
  <LoadingBoundary isLoading={isLoading} error={error} loadingComponent={Loading} errorComponent={Error500}>
    <Wrap>{children}</Wrap>
  </LoadingBoundary>
)

export default Page
