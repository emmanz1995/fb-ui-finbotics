import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.5;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
  }
  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
  button {
    cursor: pointer;
  }
  input, button, select, textarea {
    font-family: inherit;
  }
`;
