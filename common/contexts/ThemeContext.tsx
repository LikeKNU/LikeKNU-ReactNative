import { themeName, Themes } from '@/constants/theme';
import { ThemeType, UserThemeType } from '@/types/common';
import { getData, storeData } from '@/utils/storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeContextProviderProps {
  theme: ThemeType;
  setTheme: (arg1: ThemeType) => void;
  userTheme: Themes;
  changeUserTheme: (arg1: Themes) => void;
}

const ThemeContext = createContext<ThemeContextProviderProps | null>(null);

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');
  const [userTheme, setUserTheme] = useState<Themes>(Themes.LIGHT);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getData('theme');
      if (!storedTheme) {
        storeData('theme', Themes.AUTO);
        setUserTheme(Themes.AUTO);
      } else {
        setUserTheme(storedTheme as Themes);
      }

      if (storedTheme === Themes.AUTO || !storedTheme) {
        setTheme(systemTheme ?? 'light');
      } else {
        setTheme((storedTheme as ThemeType) ?? 'light');
      }
    };

    loadTheme();
  }, [systemTheme]);

  const isUserTheme = (value: any): value is UserThemeType => {
    return Object.keys(themeName).includes(value);
  };

  const changeUserTheme = (newTheme: Themes) => {
    storeData('theme', newTheme);
    setUserTheme(newTheme);
    if (newTheme === Themes.AUTO) {
      setTheme(systemTheme ?? 'light');
    } else {
      setTheme(newTheme);
    }
  };

  const contextValue = { theme, setTheme, userTheme, changeUserTheme };

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
