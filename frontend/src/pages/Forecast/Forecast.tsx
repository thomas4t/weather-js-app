import { x } from '@xstyled/styled-components'
import dayjs from 'dayjs'
import Page from '@components/blocks/Page'
import { ProductRow } from '@typings/entities/ProductRow'
import Card from '@components/elements/Card'

type Props = {
  isLoading?: boolean
  products?: ProductRow[]
}

const Example = (props: Props): JSX.Element => (
  <Page>
    <x.h2 mb="2">Keep: a data fetching library</x.h2>

    <Card mt="6">
      <x.h2 mb="2">Fetch data several ways (see ExampleContainer.tsx)</x.h2>
      <x.h4>How much products do I have? {props.isLoading ? 'loading ...' : props.products?.length}</x.h4>
    </Card>

    <x.h2 mt="12" mb="2">
      An random image
    </x.h2>

    <Card mt="6">
      <img src="https://cataas.com/cat/says/hello%20world!" alt="cat" />
    </Card>

    <x.h2 mt="12" mb="2">
      Example of date/time operations
    </x.h2>

    <Card mt="2">
      <x.div>Date: {dayjs('2019-01-25').format('DD/MM/YYYY')}</x.div>
      <x.div>Added 7 days {dayjs('2019-01-25').add(7, 'day').format('DD/MM/YYYY')}</x.div>
      <x.div>Added 7 minutes {dayjs('2019-01-25').add(7, 'minute').format('DD/MM/YYYY HH:mm:ss')}</x.div>
    </Card>
  </Page>
)

export default Example
