import styled from '@xstyled/styled-components'
import { NavLink } from 'react-router-dom'
import Header from '@components/blocks/Header'
import pages from '@pages'
import { Normalize, GlobalStyle, LayoutStyle } from './styles'
import { Trans } from '@lingui/react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 2em;
  min-height: 100px;
  flex-grow: 1;
`

const Footer = styled.div`
  text-align: center;
  margin: 1em 0;
`

const StyledNavLink = styled(NavLink)`
  font-weight: bold;
  :hover {
    color: white;
  }
`

export type Props = {
  language?: string
  onChangeLanguage: (lang: string) => void
  children: React.ReactNode
}

const DefaultLayout = ({ language, onChangeLanguage, children }: Props): JSX.Element => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <LayoutStyle />
      <Container>
        <Header title="Weather js app" perex="Weather app" language={language} onChangeLanguage={onChangeLanguage}>
          <StyledNavLink to={pages.Homepage.route.toUrl()} activeClassName="active">
            <Trans id="nav.home" message="Home" />
          </StyledNavLink>
          <StyledNavLink to={pages.Forecast.route.toUrl()} activeClassName="active">
            <Trans id="nav.home" message="Forecast" />
          </StyledNavLink>
          <StyledNavLink to={pages.DatagridPage.route.toUrl()} activeClassName="active">
            <Trans id="nav.home" message="About" />
          </StyledNavLink>
        </Header>
        <Content>{children}</Content>
        <Footer>
          <span>
            © 2022 Tomáš Trávníček <br />
            Grab a plate - Inventi &amp; Adam Bisek <br />
            All Rights Reserved.
          </span>
        </Footer>
      </Container>
    </>
  )
}

export default DefaultLayout
