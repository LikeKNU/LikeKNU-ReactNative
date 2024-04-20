import { getData } from '@/utils/storageManager';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextProviderProps {
  theme: ThemeType;
  setTheme: (arg1: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProviderProps | null>(null);

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getData('theme');
      if (storedTheme === 'auto' || !storedTheme) {
        setTheme(systemTheme ?? 'light');
      } else {
        setTheme((storedTheme as ThemeType) ?? 'light');
        console.log(storedTheme as ThemeType);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('no theme context');
  }
  return themeContext;
};

export default ThemeContextProvider;
