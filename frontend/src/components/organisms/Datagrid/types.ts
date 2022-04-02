/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React from 'react'

export enum FilteringType {
  numeric = 'numeric',
  text = 'text',
  date = 'date',
  select = 'select',
}

export enum FilteringComparators {
  equals = 'equals',
  contains = 'contains',
  in = 'in',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export type Sorting = {
  column: string
  direction: SortOrder
}

export type ColumnDefinition<RowDataType extends RowData = RowData, ColumnName extends string = string> = {
  name: ColumnName
  dataPath?: string
  title?: string | JSX.Element
  formatRowValue?: (row: RowDataType) => string | JSX.Element | number | undefined
  // headerCellComponent?: React.ComponentType<TODO> <- TODO
  contentCellComponent?: React.ComponentType<{
    rowData: RowDataType
    uxState: State['uxState']
    stateChange: StateChange
    cellComponent: React.ComponentType<{ children: React.ReactNode; width?: number }>
  }>
  // Can be either width in px or any valid grid column width definition
  width?: number | string
  isSortingEnabled?: boolean
  isFilteringEnabled?: boolean
  filteringSettings?: {
    type?: FilteringType
    options?: {
      value: string
      label: string
    }[]
    // TODO:
    // comparators?: keyof FilteringComparators[] // overrides default grid comparators
    // isMulti?: boolean // select filter is multiSelect
    // filterTime?: boolean // date filter filters time too
    // decimals?: number // number filter has this many decimals
  }
  buttons?: RowButton[]
}

export type State = {
  columnsEnabled?: string[]
  columnsOrder?: string[]
  columnsWidth?: {
    [key: string]: number
  }
  uxState?: {
    // isColumnConfigOpen: boolean <- TODO
    isRowAddingVisible?: boolean
    isFilteringVisible?: boolean
    rowMode?: string
    affectedRowId?: string
    affectedRows?: Record<string, boolean>
  }
  sorting?: Sorting[]
  filter?: {
    [columnName: string]: {
      comparator: FilteringComparators
      value: string | number | string[] | number[] | undefined
      dataPath?: string
    }
  }
  pageSize?: number
  pageIndex?: number
  pageCount?: number
}
export type StateReducer = (state: State, action: Action) => State

export enum ActionTypes {
  toggleFilters = 'toggleFilters',
  rowChangeMode = 'rowChangeMode',
  rowAdd = 'rowAdd',
  setFilter = 'setFilter',
  toggleRowSelected = 'toggleRowSelected',
  // TODO:
  // addSorting = 'addSorting',
  // setColumnWidth = 'setColumnWidth',
  // setColumnsOrder = 'setColumnsOrder',
}

export type Action = Record<'type', ActionTypes> & Record<string, any>

export type StateChange = (action: Action) => void
export type FilterSet = (column: ColumnDefinition, value: string) => void
export type HeaderButtonProps = {
  state: State
  stateChange: StateChange
  [k: string]: unknown
}
export type HeaderButton = React.ComponentType<HeaderButtonProps>

export type RowData = {
  id: string
  [k: string]: unknown
}
export type RowValues = Record<string, string | undefined>
export type RowButtonProps = {
  rowData: RowData
  state: State
  stateChange: StateChange
  getRowValues: () => RowValues
  [k: string]: unknown
}
export type RowButton = React.ComponentType<RowButtonProps>

export type Context = {
  state: State
  stateChange: StateChange
  setFilter: FilterSet
  columns?: ColumnDefinition[]
  headerButtons?: HeaderButton[]
}

export type DatagridProps = {
  className?: string
  state: State
  stateChange?: StateChange
  columns: ColumnDefinition<RowData & any>[] // eslint-disable-line @typescript-eslint/no-explicit-any
  isLoading?: boolean
  error?: string
  rowsData?: RowData[]
  // isColumnConfigEnabled?: boolean // TODO: do budoucna - modál, kde se konfigurují viditelné sloupce
  // isOversized?: boolean // TODO: grid, který má hodně sloupců a potřebuje horizontální scroll
  headerButtons?: HeaderButton[]
  rendererSettings?: Record<string, any> // TODO: settings specific for renderer only
}

export type Subscriber = (action: Action, state: State) => void // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
