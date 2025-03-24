import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useCallback, useMemo, useState, useContext, createContext } from 'react';
import { useColorScheme } from 'react-native';

const AppContext = createContext(undefined);

const AppProvider = ({ children }) => {
  const [configs, setConfigs] = useState({
    themeMode: 'auto',
    startOfWeek: 1,
    showWeekNumber: true,
    dragToCreateMode: 'duration',
  });

  const colorScheme = useColorScheme();
  const themeValue = useMemo(() => {
    const darkTheme = {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        card: '#1A1B21',
        background: '#000',
        text: '#F1F0F7',
      },
    };
    if (configs.themeMode === 'auto') {
      return colorScheme === 'dark' ? darkTheme : DefaultTheme;
    }
    return configs.themeMode === 'dark' ? darkTheme : DefaultTheme;
  }, [colorScheme, configs.themeMode]);

  const updateConfigs = useCallback((newConfigs) => {
    setConfigs((prev) => ({ ...prev, ...newConfigs }));
  }, []);

  const value = useMemo(() => ({ configs, updateConfigs }), [configs, updateConfigs]);

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider value={themeValue}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};