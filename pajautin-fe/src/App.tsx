import { useEffect, useState } from "react";
import AppMain from "./AppMain";
import PajautinAppBar from "./components/PajautinAppBar";
import LoginScreen from "./LoginScreen";
import { AppService } from "./services/app.service";
import { API_SERVER } from "./types/Constants";
import { LoginStatus } from "./types/LoginStatus";
import { Workshop } from "./types/Workshop";
import { getUniqueKeywords } from "./util/keywordutil";
import WorkshopItem from "./components/Workshoplist/WorkshopItem";
import { shuffle } from "./util/shuffle";
import { ScheduleEvent } from "./types/ScheduleEvent";

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
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);

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

  useEffect(() => {
    let appSrv: AppService = new AppService();
    appSrv.getSchedule().then((sc) => {
      // Sort by start date
      let sch = sc as ScheduleEvent[];
      sch = sch.sort((a, b) => {
        if (a.startTime > b.startTime) return 1;
        if (b.startTime > a.startTime) return -1;
        return 0;
      });

      setSchedule(sch);
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
          schedule={schedule}
          setSchedule={setSchedule}
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
