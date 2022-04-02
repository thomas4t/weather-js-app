import Page from '@components/blocks/Page'
import { x } from '@xstyled/styled-components'
import MyList from './components/MyList'

const About = (): JSX.Element => (
  <Page>
    <x.h2 mb="2">About, contributions</x.h2>
    <x.p>This project has been scraped together as an example of JS Single Page Application for a bachellor's thesis @UHK_FIM.</x.p>
    <x.p>The main purpose is to demonstrate current architectural trends and to compare this project with a similar app written in Rust & WebAssembly</x.p>
    <MyList />
  </Page>
)

export default About
