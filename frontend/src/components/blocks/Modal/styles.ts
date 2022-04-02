import styled, { system, SystemProps } from '@xstyled/styled-components'

export const ModalStyles = {
  Wrapper: styled.div<SystemProps>`
    min-width: 240px;
    max-width: ${(props) => props.maxWidth || '942px'};
    min-height: ${(props) => props.minHeight || '100px;'};
    box-shadow: md;
    border-radius: 5px;
    background-color: background1;
    color: black;
    max-height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 6;
    position: fixed;
    z-index: 200;
    left: 0;
    right: 0;
    top: 100px;
    margin: auto;
    display: flex;
    ${system};
  `,
  Background: styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: gray1;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    border-color: gray1;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 4;
  `,
  Heading: styled.div`
    display: flex;
    align-items: center;
  `,
  Content: styled.div``,
  Buttons: styled.div`
    width: 100%;
    padding-top: 4;
    display: flex;
    justify-content: flex-end;
    & > * {
      margin-left: 3;
    }
  `,
}
