import { useCallback } from 'react'
import { x } from '@xstyled/styled-components'
import { Trans } from '@lingui/react'
import { FetchAction } from '@inventi/keep'
import Card from '@components/elements/Card'
import Page from '@components/blocks/Page'
import Icon from '@components/elements/Icon'
import Button from '@components/elements/Button'
import { ProductRow } from '@typings/entities/ProductRow'
import { Modal, useModal } from '@components/blocks/Modal'
import { Can, usePermission } from '@inventi/acl'
import LanguageSwitcher from '../../components/blocks/Header/components/LanguageSwitcherContainer'

export type Props = {
  isLoading?: boolean
  error?: string
}

const Homepage = ({ isLoading, error }: Props): JSX.Element => {
  const permision = usePermission()
  console.log('Are you allowed to view a comment?', permision.isAllowed('comment', 'view'))

  const modalControls = useModal(false)

  return (
    <Page isLoading={isLoading} error={error}>
      {/* note that styled components does not use any units (px, rem, etc)! see @xstyled theme documentation */}

      <x.h2 mb="2">Common features</x.h2>
      <Card mt="6">
        <x.h3 mb="2">Permissions support</x.h3>
        <Can I="launch" a="atomMissile">
          <h4>This text displays if you can launch an atom missile!</h4>
        </Can>
        <Can not I="launch" a="atomMissile">
          <h4>This text displays if you can NOT launch an atom missile!</h4>
        </Can>
      </Card>

      <Card mt="6">
        <x.h3 mb="2">SVG Icons support</x.h3>
        <>
          <Icon icon="edit" fill="purple" width="2em" height="2em" />
          <Icon icon="error" width="2em" height="2em" />
          <Icon icon="bell" width="2em" height="2em" />
        </>
      </Card>

      <Card mt="6">
        <x.h3>Modals</x.h3>
        <Modal heading={<x.h2>Your modal header</x.h2>} {...modalControls}>
          <x.h4>Hello I am in modal</x.h4>
        </Modal>
        <Button onClick={modalControls.isOpen ? modalControls.onClose : modalControls.onOpen}>{modalControls.isOpen ? 'Close modal' : 'Open modal'}</Button>
      </Card>

      <x.h2 mt="12" mb="2">
        Random image
      </x.h2>

      <Card mt="6">
        <img src="https://cataas.com/cat/says/Hello%20weather%20app!" alt="cat" />
      </Card>
    </Page>
  )
}

export default Homepage
