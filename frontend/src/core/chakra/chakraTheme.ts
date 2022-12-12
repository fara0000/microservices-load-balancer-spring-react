import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

export default extendTheme({
  /*
    everything should be SYNC up with https://www.figma.com/file/N8xUFYN885SNJDOzVQUdDI/GameCar_final?node-id=2%3A40975
  */
  // config: {
  //   initialColorMode: "light",
  //   useSystemColorMode: false
  // },
  styles: {
    global: {
      body: {
        w: '100%',
        h: '100%',
      },
    },
  },
  fonts: {
    body: 'Pangolin',
    heading: 'Pangolin',
  },
  fontSizes: {
    xxs: '10px',
    xs: '12px',
    s: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  /*
    breakpoints:  for generating responsive UI
    https://chakra-ui.com/docs/features/responsive-styles
  */
  breakpoints: createBreakpoints({
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1536px',
  }),
  /*
    default options for theme
		(docs: https://chakra-ui.com/docs/theming/theme)
	*/
  space: {
    px: '1px',
    0: '0',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },
  sizes: {
    px: '1px',
    0: '0',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '224px',
    '2xs': '256px',
    xs: '320px',
    sm: '384px',
    md: '448px',
    lg: '512px',
    xl: '576px',
    '2xl': '672px',
    '3xl': '768px',
    '4xl': '896px',
    '5xl': '1024px',
    '6xl': '1152px',
    '7xl': '1280px',
    '8xl': '1440px',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  radii: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
  /*
    remind: all colors should be taken from figma
  */
  colors: {
    brand: {
      50: "#ecefff",
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819"
    },
    blue: {
      50: '#E6EEFF',
      100: '#CEEDFF',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#0652FD',
      600: '#2B6BE8',
      700: '#1E4E8C',
      800: '#153E75',
      900: '#1A365D',
    },
    red: {
      50: '#FFF5F5',
      100: '#FFD3D5',
      200: '#FEB2B2',
      300: '#FF7F83',
      400: '#FF7F83',
      500: '#FF4E54',
      600: '#CA3035',
      700: '#9B2C2C',
      800: '#822727',
      900: '#63171B',
    },
    orange: {
      500: '#FD7E14',
    },
    grey: {
      200: '#E2E8F0',
      300: '#C5D0EA',
      400: '#949FB9',
      500: '#718096',
      600: '#4A5568',
    },
    green: {
      500: '#4BCD68',
    },
    text: {
      dark: '#243447',
      medium: '#999FAD',
      light: '#CED3DE',
    },
    background: {
      white: '#FFFFFF',
      darkBlue: '#060617',
      medium: '#F0F1F6',
      light: '#F9FAFC',
    },
  },
  /*
    example of how to style basic components
    (docs: https://chakra-ui.com/docs/theming/component-style)
  */
  components: {
    Button: {
      baseStyle: {
        fontSize: 's',
        fontWeight: '500',
        borderRadius: 'base',
      },
    },
    Select: {
      baseStyle: {
        field: {
          minW: '70px',
        },
        icon: {
          width: '24px',
          right: '8px',
          fontSize: '20px',
        },
      },
    },
  },
});
