import React, { useCallback, useContext } from 'react'
import { ITheme, useTheme } from '@xstyled/styled-components'
import Select, { StylesConfig } from '@components/blocks/Select'
import { ColumnDefinition } from '../../../types'
import DatagridContext from '../../../DatagridContext'

const createOverrideStyles = (theme: ITheme): StylesConfig<any, any, any> => ({
  control: (base: any) => ({
    ...base,
    fontSize: theme.fontSizes?.xxs,
    paddingLeft: theme?.space?.['3'],
    boxShadow: 'none', // removes blue outline after click
    borderRadius: theme?.radii?.lg,
    borderColor: theme.colors?.gray2,
    '&:hover': {
      borderColor: theme.colors?.primary1,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    position: 'relative',
    top: '0.3em',
    '& svg': {
      marginRight: theme?.space?.['4'],
      fill: theme.colors?.primary1,
      height: '1em',
    },
  }),
  input: (base: any) => ({
    ...base,
    color: theme.colors?.primary1,
    fontWeight: theme.fontWeights?.medium,
  }),
  clearIndicator: (base: any) => ({
    ...base,
    paddingLeft: 0,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: theme.colors?.gray2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  valueContainer: (base: any) => ({
    ...base,
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    padding: 0,
  }),
  menu: (base: any) => ({
    ...base,
    marginTop: 0,
    boxShadow: 'none',
  }),
  menuList: () => ({
    padding: 0,
  }),
  option: (base: any) => ({
    ...base,
    fontSize: theme.fontSizes?.xxs,
    display: 'flex',
    flexDirection: 'collumn',
    margin: 0,
    padding: `${theme?.space?.['2']} ${theme?.space?.['2']}`,
    border: '1px solid',
    borderColor: theme.colors?.gray2 || base.borderColor,
    borderTop: 0,
    background: 'white',
    color: theme.colors.gray1 || 'black',
    '&:hover': {
      background: theme.colors?.gray4 || base.background,
      color: theme.colors?.primary1 || base.color,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme?.radii?.lg,
      borderBottomRightRadius: theme?.radii?.lg,
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: theme.colors?.primary1,
    fontWeight: theme.fontWeights?.medium,
  }),
})

type Props = {
  column: ColumnDefinition
}

const SelectCell = ({ column }: Props): JSX.Element => {
  const theme = useTheme()
  const { setFilter } = useContext(DatagridContext)

  const handleOnChange = useCallback(
    (option: any): void => {
      setFilter(column, option?.value)
    },
    [column, setFilter],
  )

  return <Select onChange={handleOnChange} styles={createOverrideStyles(theme)} options={column.filteringSettings?.options} placeholder={column.title} />
}

export default SelectCell
