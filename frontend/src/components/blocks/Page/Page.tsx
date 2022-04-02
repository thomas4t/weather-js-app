import styled from '@xstyled/styled-components'
import PermissionsBoundary from '@components/elements/PermissionsBoundary'
import LoadingBoundary from '@components/elements/LoadingBoundary'
import Error500 from '@pages/Error500'
import Loading from '@pages/Loading'
import permisionsNeededToAcl from '@utils/permisionsNeededToAcl'

export type Props = {
  children: React.ReactNode
  isLoading?: boolean
  error?: string
  permisionsNeeded?: string
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 10px auto 0;
`

const Page = ({ children, isLoading, error, permisionsNeeded }: Props): JSX.Element => {
  const [resource, operation] = permisionsNeededToAcl(permisionsNeeded)
  return (
    <PermissionsBoundary resource={resource} operation={operation} errorComponent={Error500}>
      <LoadingBoundary isLoading={isLoading} error={error} loadingComponent={Loading} errorComponent={Error500}>
        <Wrap>{children}</Wrap>
      </LoadingBoundary>
    </PermissionsBoundary>
  )
}

export default Page
