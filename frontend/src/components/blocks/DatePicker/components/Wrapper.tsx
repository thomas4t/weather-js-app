import styled from '@xstyled/styled-components'

const Wrapper = styled.div`
  position: relative;
  .DayPickerInput {
    width: 100%;
  }
  .DayPicker-Caption {
    display: none;
  }
  .DayPicker-Day {
    border-radius: 0;
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: primary4;
    color: gray1;
  }
  .DayPicker-Day--selected.DayPicker-Day--end:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside),
  .DayPicker-Day--selected.DayPicker-Day--start:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: primary1;
    color: white;
  }
`
export default Wrapper
