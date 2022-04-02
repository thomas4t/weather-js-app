import { useCallback } from 'react'
import styled from '@xstyled/styled-components'
import { NavLink } from 'react-router-dom'
import Header from '@components/blocks/Header'
import Notifications, { NotificationType } from '@components/blocks/Notifications'
import Button from '@components/elements/Button'
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
  notifications?: NotificationType[]
  pushNotification: (message: string) => void
  user?: IUser
}

const emptyNotifications: NotificationType[] = []

const DefaultLayout = ({ children, user, notifications = emptyNotifications, pushNotification }: Props): JSX.Element => {
  const pushNotificationMemoized = useCallback(() => pushNotification('test'), [pushNotification])
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <LayoutStyle />
      <Container>
        <Header title="Weather js app" perex="An opinionated web boilerplate" user={user}>
          <StyledNavLink to={pages.Homepage.route.toUrl()} activeClassName="active">
            Home
          </StyledNavLink>
          <StyledNavLink to={pages.Example.route.toUrl()} activeClassName="active">
            Another page
          </StyledNavLink>
          <StyledNavLink to={pages.ExampleForm.route.toUrl()} activeClassName="active">
            Example form
          </StyledNavLink>
          <StyledNavLink to={pages.DatagridPage.route.toUrl()} activeClassName="active">
            Datagrid
          </StyledNavLink>
          <StyledNavLink to={pages.Login.route.toUrl()} activeClassName="active">
            Login
          </StyledNavLink>
          <Button type="button" onClick={pushNotificationMemoized}>
            Push notification
          </Button>
        </Header>
        <Notifications notifications={notifications} />
        <Content>{children}</Content>
        <Footer>© 2021 — Adam Bisek &amp; Inventi, All Rights Reserved.</Footer>
      </Container>
    </>
  )
}

export default DefaultLayout
