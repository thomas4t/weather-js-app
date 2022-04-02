import Avatar from '@components/elements/Avatar'
import Icon from '@components/elements/Icon'
import styled, { x } from '@xstyled/styled-components'

const Wrap = styled.div`
  width: 100%;
  background-color: background2;
  color: white;
  & h1 {
    color: white;
  }
  padding: 3 4;
`

const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChildrenWrap = styled.div`
  margin-top: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin-left: 3;
    margin-right: 3;
  }
  & > *:first-child {
    margin-left: 0;
  }
`

export interface UserInfoProps {
  user: IUser
}

const UserInfo = ({ user }: UserInfoProps): JSX.Element => (
  <x.div display="flex" alignItems="center" border="1px solid" borderColor="gray3" borderRadius="md" p="1">
    <x.div mr="3">{user.email}</x.div>
    <Avatar w="3em" h="3em" src={user.avatarUrl} alt={user.email} />
  </x.div>
)

export interface Props {
  title: string
  perex: string
  children?: React.ReactNode
  user?: IUser
}

const Header = ({ title, perex, user, children }: Props): JSX.Element => (
  <Wrap>
    <x.div display="flex">
      <Icon icon="logo" width="10em" height={undefined} strokeHovered="primary1" />
      <x.h1 display="none">{title}</x.h1>
    </x.div>
    <x.p color="gray3">{perex}</x.p>
    <BottomWrap>
      <ChildrenWrap>{children}</ChildrenWrap>
      {user && <UserInfo user={user} />}
    </BottomWrap>
  </Wrap>
)

export default Header
