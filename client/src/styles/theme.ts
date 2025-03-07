import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: {
    sm: '0.4rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  buttonSizes: {
    sm: '5rem',
    base: '7.5rem',
    lg: '10rem',
    xl: '15rem',
  },
  colors: {
    bold: '#009292',
    primary: '#00C9C8',
    secondary: '#A3CFCD',
    tertiary: '#BFFCF9',
    black: '#121212',
    white: `rgba(255,255,255,1)`,
  },
  margins: {
    sm: '0.5rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  paddings: {
    sm: '.5rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  fontSizes: {
    sm: '1.4rem',
    base: '1.6rem',
    lg: '2.0rem',
    xl: '2.8rem',
    title: '3.2rem',
  },
  fontWeights: {
    light: 100,
    normal: 400,
    bold: 700,
  },
  flexCenter: `
    display:flex;
    justify-content:center;
    align-items:center;
  `,
};

export { theme };
