import { useEffect, useState } from "react";
import AppMain from "./AppMain";
import PajautinAppBar from "./components/PajautinAppBar";
import LoginScreen from "./LoginScreen";
import { AppService } from "./services/app.service";
import { API_SERVER } from "./types/Constants";
import { LoginStatus } from "./types/LoginStatus";
import { Workshop } from "./types/Workshop";
import { getUniqueKeywords } from "./util/keywordutil";

function App() {
  const [wsItems, setWsItems] = useState<Workshop[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loggedIn: false,
    firstName: "",
    lastName: "",
  });
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    let appSrv: AppService = new AppService();
    appSrv.getWorkshops().then((ws) => {
      setWsItems(ws);
      let kw = getUniqueKeywords(ws);
      setKeywords(kw);
      //console.log(kw);
    });
  }, []);

  const login = (userId: string) => {
    console.log("Login attempt:" + userId);
    let appSrv: AppService = new AppService();
    appSrv.doLogin(userId).then((loginReply) => {
      console.log(loginReply);
      if (loginReply.status == "ok") {
        setLoginStatus({
          loggedIn: true,
          firstName: loginReply.participant.firstName,
          lastName: loginReply.participant.lastName,
        });
      }
    });
  };

  return (
    <>
      <PajautinAppBar loginStatus={loginStatus} />
      {loginStatus.loggedIn ? (
        <AppMain
          loginStatus={loginStatus}
          wsKeywords={keywords}
          wsList={wsItems}
        />
      ) : (
        <LoginScreen login={login} loginError={loginError} />
      )}
    </>
  );
}

export default App;
