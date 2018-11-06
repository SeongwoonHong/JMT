import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Work Sans', sans-serif;
  }

  input, textarea, select, button {
    font: unset;

    &:focus, &:active {
      outline: none;
    }
  }
`;
