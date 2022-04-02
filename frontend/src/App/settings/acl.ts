import { Permission } from '@inventi/acl'

export enum Roles {
  guest = 'guest',
  admin = 'admin',
}

export enum Resources {
  homepage = 'homepage',
  foo = 'foo',
}

const acl = new Permission()
Object.keys(Roles).forEach((Role) => {
  acl.addRole(Role)
})

Object.keys(Resources).forEach((Resource) => {
  acl.addResource(Resource)
})

acl.allow(Roles.guest, [Resources.homepage, Resources.foo], 'view')
acl.allow(Roles.admin, acl.ALL, ['view', 'edit', 'add'])

export default acl
