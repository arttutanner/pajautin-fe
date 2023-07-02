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
import LoginIcon from "@mui/icons-material/Login";
import { LoginStatus } from "../types/LoginStatus";

interface Props {
  loginStatus: LoginStatus;
  logOut: () => void;
  backToLogin: () => void;
}

function PajautinAppBar({ loginStatus, logOut, backToLogin }: Props) {
  return (
    <AppBar position="fixed" sx={{ background: "#de581d" }}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src="jt_logo_wh.png" />
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
        ) : loginStatus.viewOnly ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, marginLeft: "10px" }}
            onClick={backToLogin}
          >
            <LoginIcon />
          </IconButton>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}
export default PajautinAppBar;
