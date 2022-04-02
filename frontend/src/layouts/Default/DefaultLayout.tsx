import styled from '@xstyled/styled-components'
import { NavLink } from 'react-router-dom'
import Header from '@components/blocks/Header'
import pages from '@pages'
import { Normalize, GlobalStyle, LayoutStyle } from './styles'

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
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <LayoutStyle />
      <Container>
        <Header title="Weather js app" perex="Weather app">
          <StyledNavLink to={pages.Homepage.route.toUrl()} activeClassName="active">
            Home
          </StyledNavLink>
          <StyledNavLink to={pages.Example.route.toUrl()} activeClassName="active">
            Another page
          </StyledNavLink>
          <StyledNavLink to={pages.Forecast.route.toUrl()} activeClassName="active">
            Forecast
          </StyledNavLink>
          <StyledNavLink to={pages.DatagridPage.route.toUrl()} activeClassName="active">
            Datagrid
          </StyledNavLink>
          <StyledNavLink to={pages.Login.route.toUrl()} activeClassName="active">
            Login
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
