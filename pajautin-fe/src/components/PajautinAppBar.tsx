import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoginStatus } from "../types/LoginStatus";

interface Props {
  loginStatus: LoginStatus;
  logOut: () => void;
}

function PajautinAppBar({ loginStatus, logOut }: Props) {
  return (
    <AppBar position="sticky" sx={{ background: "#de581d" }}>
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
        {loginStatus != null &&
        loginStatus != undefined &&
        loginStatus.loggedIn ? (
          <>
            {loginStatus.firstName + " " + loginStatus.lastName + " "}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, marginLeft: "10px" }}
              onClick={() => logOut()}
            >
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}
export default PajautinAppBar;
