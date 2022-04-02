import Page from '@components/blocks/Page'
import ExampleFormComponent from '@components/forms/example'

type Props = {
  onSubmit: (values: Record<string, any>) => void
}

const defaultValues = {}

const ExampleForm = ({ onSubmit }: Props): JSX.Element => (
  <Page>
    <ExampleFormComponent onSubmit={onSubmit} defaultValues={defaultValues} />
  </Page>
)

export default ExampleForm
