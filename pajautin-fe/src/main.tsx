import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.css";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import App from "./App";

const TYPE_COLORS = [red[500], green[500], blue[500]];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
