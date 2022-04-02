import { x } from '@xstyled/styled-components'
import { Notification as NotificationType } from '@store/notifications'
import Notification from '@components/elements/Notification'

type Props = {
  notifications?: NotificationType[]
}

const Notifications = ({ notifications }: Props): JSX.Element | null => {
  if (!notifications) return null
  return (
    <x.div zIndex="7" mt="1">
      {notifications.map((notification) => (
        <x.div mb="1" key={notification.id}>
          <Notification {...notification} />
        </x.div>
      ))}
    </x.div>
  )
}

export type { NotificationType }

export default Notifications
