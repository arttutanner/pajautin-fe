import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginStatus } from "../types/LoginStatus";

interface Props {
  loginStatus: LoginStatus;
}

function PajautinAppBar({ loginStatus }: Props) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Johtajatulet - Pajautin
        </Typography>
        {loginStatus != null && loginStatus != undefined && loginStatus.loggedIn
          ? loginStatus.firstName + " " + loginStatus.lastName
          : ""}
      </Toolbar>
    </AppBar>
  );
}
export default PajautinAppBar;
