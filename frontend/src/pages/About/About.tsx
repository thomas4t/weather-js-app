import Page from '@components/blocks/Page'
import { x } from '@xstyled/styled-components'
import MyDatagrid from './components/Datagrid'

const About = (): JSX.Element => (
  <Page>
    <x.h2 mb="2">Page with simple datagrid</x.h2>
    <x.p>Data are loaded from backend</x.p>
    <MyDatagrid />
  </Page>
)

export default About
