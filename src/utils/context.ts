/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

interface ThemeType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface ToggleType {
  toggle: string;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

const theme: ThemeType = {
  theme: "",
  setTheme: () => {},
};

const toggle: ToggleType = {
  toggle: "",
  setToggle: () => {},
};

export const ThemeContext = createContext(theme);
export const ToggleContext = createContext(toggle);
