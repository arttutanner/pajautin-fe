import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

export const THEME_COLORS = {
    HIILI: {
      "100": "#132323",
      "80": "#43504f",
      "50": "#999191",
    },
    LOIMU: {
      "100": "#ed672c",
      "80": "#ef855c",
      "50": "#f5b398",
      "30": "#fad1c0",
      "10" : "#fdf0ea"
    },
    LIESKA: {
      "100": "#cf2742",
      "80": "#d65469",
      "50": "#e594a1",
      "30" : "#f2bcc5",
      "10" : "#fbe9ec"
    },
    METSALAMPI: {
      "100": "#025a63",
      "80": "#387b81",
      "50": "#82acb0",
      "30" : "#87f2fd",
      "10" : "#d7fbfe",
      "5" : "#effdff"
    },
    POUTA: {
      "100": "#a6cbd6",
      "80": "#b9d5de",
      "50": "#d3e5ea",
    },
	TUHKA: {
		"100" : "#efecea"
	}
  };
export const TYPE_COLORS = [THEME_COLORS.LIESKA[100], THEME_COLORS.LOIMU[80], THEME_COLORS.METSALAMPI[100]];
export const TYPE_COLORS_LIGHT = [THEME_COLORS.LIESKA[10], THEME_COLORS.LOIMU[10], THEME_COLORS.METSALAMPI[5]];
export const TYPE_NAMES = ["Työpaja","Vertaisverstas","Puheenvuoro"];
export const API_SERVER = "http://127.0.0.1:9998";
export const SLOT_TIMES = [
  { startTime : "2023-08-26T11:00:00", endTime : "2023-08-26T12:15" },
  { startTime : "2023-08-26T14:00:00", endTime : "2023-08-26T15:15" },
  { startTime : "2023-08-26T15:45:00", endTime : "2023-08-26T17:00" }
]

export const PAJAUTIN_READ_ONLY=false;



