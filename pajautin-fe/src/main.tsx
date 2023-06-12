import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.css";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import { purple } from "@mui/material/colors";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const TYPE_COLORS = [red[500], green[500], blue[500]];

const colors = {
  HIILI: {
    "100": "#132323",
    "80": "#43504f",
    "50": "#8999191",
  },
  LOIMU: {
    "100": "#ed672c",
    "80": "#ef855c",
    "50": "#f5b398",
  },
  LIESKA: {
    "100": "#ed672c",
    "80": "#ef855c",
    "50": "#f5b398",
  },
  METSALAMPI: {
    "100": "#ed672c",
    "80": "#ef855c",
    "50": "#f5b398",
  },
  POUTA: {
    "100": "#ed672c",
    "80": "#ef855c",
    "50": "#f5b398",
  },
};
/*
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      //  main: "purple[500]",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});
*/

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<ThemeProvider theme={theme}>
  <App />
  //</ThemeProvider>
);
