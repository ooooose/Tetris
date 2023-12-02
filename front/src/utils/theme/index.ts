import { extendTheme } from '@chakra-ui/theme-utils';

/**
 * chakra-uiのテーマの変数定芸
 *
 * 参考: https://chakra-ui.com/docs/styled-system/customize-theme
 *
 * @category 定数変数
 * @group テーマ
 */
export const theme = extendTheme({
  components: {
    Checkbox: {
      variants: {
        sidebar: {
          control: {
            borderRadius: '20%',
            width: '20px',
            height: '20px',
            backgroundColor: '#303444',
            border: '2px solid',
            marginTop: '2px',
          },
        },
      },
    },
  },
  colors: {
    brand: {
      50: '#ece6ff',
      100: '#c5b5ff',
      200: '#9a86fb',
      300: '#523DF5',
      400: '#3c25f4',
      500: '#310bda',
      600: '#2f08ab',
      700: '#28057b',
      800: '#1c034c',
      900: '#0e001e',
      blue: '#523DF5',
      'blue.middle': '#797EF8',
      light: '#EDECFF',
      'light.gray': '#CCCDDD',
      purple: '#BB48ECDA',
    },
    menu: {
      bg: '#181C2C',
      'bg.select': '#303444',
    },
    accent: {
      blue: '#4871EF',
      'blue.light': '#E8EEFC',
      yellow: '#F5B000',
    },
    gray: {
      middle: '#5C616A',
      light: '#F4F4F4',
      disabled: '#AEAEAE',
      f4: '#F4F4F4',
      d1: '#D1D1D1',
      border: '#CCCDDD',
      transparent: '#CCCDDD33',
    },
    blue: {
      arrow: '#00B4E7',
    },
    bg: '#FFFFFF',
    'bg.buttons': '#F4F5FA',
    black: {
      '2b': '#2B2B2B',
    },
  },
  layerStyles: {
    gradientBg: {
      background:
        'linear-gradient(229deg, #BB48EC 0%, #7466E5 45.31%, #2467F1 100%)',
    },
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '16px',
        height: '16px',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#797EF8',
        borderRadius: '10px',
        border: '5px solid transparent',
        backgroundClip: 'padding-box',
      },
      '::-webkit-scrollbar-track': {
        margin: '5px',
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: '#797EF8 transparent',
      },
    },
  },
});
