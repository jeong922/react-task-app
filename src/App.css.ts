import { createGlobalTheme, style } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    main: 'rgb(203 213 225)',
    mainDarker: 'rgb(15 23 42)',
    mainFaded: 'rgb(56, 90, 136)',
    mainFadedBright: 'rgb(148 163 184)',
    list: 'rgb(235,236,240)',
    task: 'rgb(255,255,255)',
    taskHover: 'rgb(245,245,245)',
    brightText: 'rgb(255,255,255)',
    darkText: 'rgb(24,42,77)',
    secondaryDarkText: 'rgb(94,108,132)',
    secondaryDarkTextHover: 'rgb(198, 218, 255)',
    selectedTap: 'rgb(137,176,174)',
    updatedButton: 'rgb(69, 128, 201)',
    deleteButton: 'rgb(237,51,88)',
    overlay: 'rgb(0, 0, 0, 0.7);',
  },
  fontSizing: {
    T1: '32px',
    T2: '24px',
    T3: '18px',
    T4: '14px',
    P1: '12px',
  },
  spacing: {
    small: '5px',
    medium: '10px',
    big1: '20px',
    big2: '15px',
    listSpacing: '30px',
  },
  font: {
    body: 'arial',
  },
  shadow: {
    basic: '4px 4px 8px 0px rgb(34, 60, 80, 0.2)',
  },
  minWidth: {
    list: '250px',
  },
});

export const appContainer = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height: 'max-content',
  width: '100vw',
  position: 'relative',
});

export const board = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
});

export const buttons = style({
  marginTop: 'auto',
  paddingLeft: vars.spacing.big2,
});

export const deleteBoardButton = style({
  border: 'none',
  borderRadius: 5,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: 'auto',
  marginBottom: 30,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  color: vars.color.brightText,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ':hover': {
    opacity: 0.8,
  },
});

export const loggerButton = style({
  border: 'none',
  borderRadius: 5,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: '15px',
  marginRight: '30px',
  marginBottom: '30px',
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.mainFaded,
  color: vars.color.brightText,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ':hover': {
    opacity: 0.8,
  },
});
