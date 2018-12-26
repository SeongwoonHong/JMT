import { injectGlobal } from 'styled-components';

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
`;
