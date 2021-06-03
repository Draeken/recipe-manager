import { PaletteTheme, TypographyTheme } from '@recipes-manager/ui';

const typoTheme: TypographyTheme = {
  typeface: {
    titleTypeface: "'Roboto', sans-serif",
  },
};

const paletteTheme: PaletteTheme = {
  palette: {
    primary: {
      main: '#7cb342',
      darkVariant: '#4b830d',
      lightVariant: '#aee571',
      on: '#000000',
    },
    surface: {
      background: '#FFFFFF',
      main: '#FFFFFF',
      on: '#000000',
      baseEmphase: '#000000',
      highEmphase: 'DD',
      mediumEmphase: '99',
      disabled: '61',
    },
    divider: '#00000099',
  },
};

export const theme = {
  ...typoTheme,
  ...paletteTheme,
};
