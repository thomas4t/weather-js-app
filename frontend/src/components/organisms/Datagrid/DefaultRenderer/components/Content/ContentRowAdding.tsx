import React, { RefObject } from 'react'
import Button, { ButtonSize, ButtonVariant } from '@components/elements/Button'
import Icon from '@components/elements/Icon'
import styled from '@xstyled/styled-components'
import { ColumnDefinition } from '../../../types'
import CellInput from '../CellInput'
import ContentCell from './ContentCell'
import ContentRow from './ContentRow'

type Props = {
  columns?: ColumnDefinition[]
  onAddRow: () => void
  refs: { [key: string]: RefObject<HTMLInputElement> }
}

const StyledIcons = styled(Icon)`
  transform: rotate(45deg);
  stroke: primary1;
`

const ContentRowAdding = ({ columns, refs, onAddRow }: Props): JSX.Element => (
  <ContentRow>
    {columns
      ?.filter((column) => !column.buttons)
      ?.map((column) => (
        <ContentCell key={`new-${column.name}`}>
          <CellInput column={column} ref={refs[column.name]} icons={<StyledIcons icon="Cross" />} />
        </ContentCell>
      ))}
    {/* This will handle case when we have multiple buttons columns. Button add will be rendered only in the first column  */}
    {columns
      ?.filter((column) => column.buttons)
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ?.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ContentCell key={`buttons-new-${i}`}>
          {i === 0 && (
            <Button variant={ButtonVariant.secondary} size={ButtonSize.small} type="button" onClick={onAddRow}>
              Add
            </Button>
          )}
        </ContentCell>
      ))}
  </ContentRow>
)

export default ContentRowAdding
