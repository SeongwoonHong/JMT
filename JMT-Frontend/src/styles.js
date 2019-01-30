import { injectGlobal } from 'styled-components';
import { colors } from 'constants';

injectGlobal`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Work Sans', sans-serif;
  }

  input {
    width: 100%;
  }

  input, textarea, select, button {
    font: unset;
    border: none;
    
    &:focus, &:active {
      outline: none;
    }
  }

  div {
    &:focus, &:active {
      outline: none;
    }
  }

  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    width: 100%;

    input {
      font-size: 20px;
      color: ${colors.teal};
      text-align: center;
    }
  }
`;
