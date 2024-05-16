import { createGlobalTheme, style } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    main: 'rgb(203 213 225)',
    mainDarker: 'rgb(15 23 42)',
    mainFaded: 'rgb(226 232 240)',
    mainFadedBright: 'rgb(148 163 184)',
    list: 'rgb(235,236,240)',
    task: 'rgb(244,244,244)',
    taskHover: 'rgb(245,245,245)',
    brightText: 'rgb(255,255,255)',
    darkText: 'rgb(24,42,77)',
    secondaryDarkText: 'rgb(94,108,132)',
    secondaryDarkTextHover: 'rgb(128,129,226)',
    selectedTap: 'rgb(137,176,174)',
    updatedButton: 'rgb(203 213 225)',
    deleteButton: 'rgb(237,51,88)',
  },
  fontSizing: {
    T1: '32px',
    T2: '24px',
    T3: '18px',
    T4: '14px',
    P1: '12px',
  },
  spacing: {
    samll: '5px',
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