import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import React from "react";

enum themePalette {
  BG = "#12181b",
  LIME = "#c8fa5f",
  FONT_GLOBAL = "'JetBrains Mono', monospace",
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: themePalette.BG,
    },

    primary: {
      main: themePalette.LIME,
    },
  },

  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
  },

  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "0.5em",
        },
      },
    },
  },
});

type ThemeProp = {
  children: JSX.Element;
};

const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { ThemeConfig };
