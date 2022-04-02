import { StylesConfig } from 'react-select'
import { ITheme } from '@xstyled/styled-components'

const createOverrideStyles = (theme: ITheme): StylesConfig<any, any, any> => ({
  control: (base: any) => ({
    ...base,
    fontSize: theme.fontSizes?.default,
    paddingLeft: theme?.space?.['3'],
    boxShadow: 'none', // removes blue outline after click
    borderRadius: 0,
    borderColor: theme.colors?.gray3 || base.borderColor,
    '&:hover': {
      borderColor: theme.colors?.primary1 || base.borderColor,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  clearIndicator: (base: any) => ({
    ...base,
    paddingLeft: 0,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: theme.colors?.gray1 || base.color,
  }),
  valueContainer: (base: any) => ({
    ...base,
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    paddingRight: 0,
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    boxShadow: 'none',
  }),
  menuList: () => ({
    padding: 0,
  }),
  option: (base: any) => ({
    ...base,
    fontSize: theme.fontSizes?.default,
    display: 'inline-flex',
    margin: 0,
    padding: `${theme?.space?.['3']} ${theme?.space?.['6']}`,
    border: '1px solid',
    borderColor: theme.colors?.gray3 || base.borderColor,
    borderTop: 0,
    background: 'white',
    color: theme.colors.gray1 || 'black',
    '&:hover': {
      background: theme.colors?.gray4 || base.background,
      color: theme.colors?.primary1 || base.color,
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    marginRight: 0,
  }),
})

export default createOverrideStyles
