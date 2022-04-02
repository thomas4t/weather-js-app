/* eslint-disable react-perf/jsx-no-new-array-as-prop, react/no-array-index-key */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { x } from '@xstyled/styled-components'
import get from 'lodash/fp/get'
import Grid, { Col } from '.'

export default {
  title: 'Blocks/Grid',
  component: Grid,
  argTypes: {
    columnCount: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    size: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
    },
    gutter: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    verticalGutter: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
} as ComponentMeta<typeof Grid>

const ColumnContent = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <x.div minHeight="30vh" display="flex" justifyContent="center" alignItems="center" background="lightgray">
    {children}
  </x.div>
)

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
    {new Array(get('columnCount', args)).fill('').map((_col, i) => (
      <Col key={i}>
        <ColumnContent>col {i + 1} content</ColumnContent>
      </Col>
    ))}
  </Grid>
)

export const Basic = Template.bind({})

Basic.args = {
  // @ts-ignore
  columnCount: 3,
  size: 4,
  gutter: 2,
  reverse: false,
  debug: true,
}

const TemplateDifferentSizes: ComponentStory<typeof Grid> = () => (
  <Grid size={3} gutter={2} debug>
    <Col size={6}>
      <ColumnContent>col 1 content</ColumnContent>
    </Col>
    <Col>
      <ColumnContent>col 2 content</ColumnContent>
    </Col>
    <Col>
      <ColumnContent>col 3 content</ColumnContent>
    </Col>
  </Grid>
)

export const DifferentSizes = TemplateDifferentSizes.bind({})

const responsiveSizes = [12, 6, 4]
const TemplateResponsive: ComponentStory<typeof Grid> = () => (
  <Grid size={responsiveSizes} gutter={5} debug>
    <Col>
      <ColumnContent>col 1 content</ColumnContent>
    </Col>
    <Col>
      <ColumnContent>col 2 content</ColumnContent>
    </Col>
    <Col>
      <ColumnContent>col 3 content</ColumnContent>
    </Col>
  </Grid>
)

export const Responsive = TemplateResponsive.bind({})
