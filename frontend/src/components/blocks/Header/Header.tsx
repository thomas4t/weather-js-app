import Icon from '@components/elements/Icon'
import styled, { x } from '@xstyled/styled-components'

const Wrap = styled.div`
  width: 100%;
  background-color: background2;
  color: white;
  & h1 {
    color: white;
  }
  padding: 3 4;
`

const BottomWrap = styled.div`
  display: flex;
  justify-content: center;
`

const ChildrenWrap = styled.div`
  margin-top: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin-left: 3;
    margin-right: 3;
  }
  & > *:first-child {
    margin-left: 0;
  }
`

export interface Props {
  title: string
  perex: string
  children?: React.ReactNode
}

const Header = ({ title, perex, children }: Props): JSX.Element => (
  <Wrap>
    <x.div display="flex" justifyContent="center" alignItems="center" mb={3}>
      <x.h1 display="none">{title}</x.h1>
      <Icon icon="cloudyDay" width="4rem" height="4rem" />
      <x.span fontSize="2rem" mt={2}>
        {perex}
      </x.span>
    </x.div>

    <BottomWrap>
      <ChildrenWrap>{children}</ChildrenWrap>
    </BottomWrap>
  </Wrap>
)

export default Header
