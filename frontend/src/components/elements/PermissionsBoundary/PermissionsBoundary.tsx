import React, { ComponentType } from 'react'
import { Can } from '@inventi/acl'

export type Props = {
  resource?: string
  operation?: string
  errorComponent: ComponentType<{ error?: Error }>
  children: JSX.Element
}

const PermissionsBoundary = ({ resource, operation, errorComponent: ErrorComponent, children }: Props): JSX.Element => {
  if (typeof resource === 'undefined' && typeof operation === 'undefined') {
    return children
  }
  if (typeof resource === 'undefined' || typeof operation === 'undefined') {
    throw new Error(`Both resource and operation must be defined or both undefined; Given resource (${resource}), given operation (${operation}).`)
  }

  return (
    <>
      <Can not I={operation} a={resource}>
        <ErrorComponent error={new Error('You are not allowed to see this page.')} />
      </Can>
      <Can I={operation} a={resource}>
        {children}
      </Can>
    </>
  )
}

export default PermissionsBoundary
