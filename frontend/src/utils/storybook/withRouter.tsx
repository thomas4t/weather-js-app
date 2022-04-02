import { MemoryRouter } from 'react-router'

const withRouter = (Story: React.ComponentType): JSX.Element => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
)

export default withRouter
