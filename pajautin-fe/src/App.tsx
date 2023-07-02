import { useEffect, useState } from "react";
import AppMain from "./AppMain";
import PajautinAppBar from "./components/PajautinAppBar";
import LoginScreen from "./LoginScreen";
import { AppService } from "./services/app.service";
import { API_SERVER } from "./types/Constants";
import { LoginStatus } from "./types/LoginStatus";
import { Workshop } from "./types/Workshop";
import { getUniqueKeywords } from "./util/keywordutil";
import WorkshopItem from "./components/WorkshopItem";
import { shuffle } from "./util/shuffle";

function App() {
  const [wsItems, setWsItems] = useState<Workshop[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loggedIn: false,
    viewOnly: false,
    firstName: "",
    lastName: "",
  });
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    let appSrv: AppService = new AppService();
    appSrv.getWorkshops().then((ws) => {
      // Sort by id
      let wsi = ws as Workshop[];
      wsi = wsi.sort((a, b) => a.id - b.id);

      setWsItems(shuffle(wsi));
      let kw = getUniqueKeywords(ws);
      setKeywords(kw);
    });
  }, []);

  const login = (userId: string) => {
    let appSrv: AppService = new AppService();
    appSrv.doLogin(userId).then((loginReply) => {
      if (loginReply.status == "ok") {
        setLoginStatus({
          loggedIn: true,
          viewOnly: false,
          firstName: loginReply.participant.firstName,
          lastName: loginReply.participant.lastName,
        });
      } else {
        setLoginError("Virheellinen ilmoittautumistunnus!");
      }
    });
  };

  const loginViewOnly = () => {
    setLoginStatus({
      loggedIn: false,
      viewOnly: true,
      firstName: null,
      lastName: null,
    });
  };

  const logout = () => {
    let appSrv: AppService = new AppService();
    appSrv.doLogout().then((loginReply) => {
      setLoginStatus({
        loggedIn: false,
        viewOnly: false,
        firstName: null,
        lastName: null,
      });
    });
  };

  const backToLogin = () => {
    setLoginStatus({
      loggedIn: false,
      viewOnly: false,
      firstName: null,
      lastName: null,
    });
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: "JT23_Kuosi_TummanSininen.jpg" }}
    >
      <PajautinAppBar
        loginStatus={loginStatus}
        logOut={logout}
        backToLogin={backToLogin}
      />
      {loginStatus.loggedIn || loginStatus.viewOnly ? (
        <AppMain
          loginStatus={loginStatus}
          wsKeywords={keywords}
          wsList={wsItems}
        />
      ) : (
        <LoginScreen
          login={login}
          loginViewOnly={loginViewOnly}
          loginError={loginError}
        />
      )}
    </div>
  );
}

export default App;
