import React, { createContext } from 'react';
import theme, { Theme } from './index';

export const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
