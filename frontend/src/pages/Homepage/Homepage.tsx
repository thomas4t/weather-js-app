import { x } from '@xstyled/styled-components'
import { Trans } from '@lingui/react'
import Card from '@components/elements/Card'
import Page from '@components/blocks/Page'

export type Props = {
  isLoading?: boolean
  error?: string
}

const Homepage = ({ isLoading, error }: Props): JSX.Element => (
  <Page isLoading={isLoading} error={error}>
    <x.h2 mb="2">
      <Trans id="page.homepage.title" message="Homepage, welcome!" />
    </x.h2>

    <Card mt="6">
      <img src="https://cataas.com/cat/says/Hello%20weather%20app!" alt="cat" />
    </Card>
  </Page>
)

export default Homepage
