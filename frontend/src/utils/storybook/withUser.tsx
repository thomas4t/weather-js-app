import React from 'react'
import { StoryContext } from '@storybook/react'
import { Provider as AclProvider } from '@inventi/acl'
import acl from '../../App/settings/acl'

type ContextUser = 'unlogged' | 'defaultUser' | undefined

const withUser = (Story: React.ComponentType<{ user?: IUser }>, context: StoryContext): JSX.Element => {
  const userName: ContextUser = context.globals.user
  const user: IUser | undefined =
    !userName || userName === 'unlogged' ? undefined : { id: '1', email: `${userName}@example.com`, avatarUrl: 'https://cataas.com/cat' }
  const role = !userName || userName === 'unlogged' ? 'guest' : 'admin'

  return (
    <AclProvider permission={acl} role={role}>
      <Story user={user} />
    </AclProvider>
  )
}

export default withUser
