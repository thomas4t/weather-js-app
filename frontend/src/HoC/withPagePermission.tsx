/* eslint-disable react/function-component-definition */
import React from 'react'
import { usePermission } from '@inventi/acl'
import Error500 from '@pages/Error500'
import permisionsNeededToAcl from '@utils/permisionsNeededToAcl'

// This is HoC instead of hook for a good reason: hooks can be called conditionally.
const withPagePermission = (permisionsNeeded: string) => (Component: React.ComponentType) =>
  function ComponentwithPagePermission(): JSX.Element {
    const permission = usePermission()

    const [resource, operation] = permisionsNeededToAcl(permisionsNeeded)
    if (typeof resource === 'undefined' || typeof operation === 'undefined') return <Component />
    if (permission.isAllowed(resource, operation)) return <Component />
    return <Error500 error={new Error('You are not allowed to see this page.')} />
  }

export default withPagePermission
