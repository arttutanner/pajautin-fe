import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import WorkshopList from "./components/Workshoplist/WorkshopList";
import { Workshop } from "./types/Workshop";
import Filterbar from "./components/Filterbar";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { WorkshopFilter } from "./types/WorkshopFilter";

import Container from "@mui/material/Container";
import PajautinAppBar from "./components/PajautinAppBar";
import SelectedWorkshops from "./components/Workshoplist/SelectedWorkshops";

import { AppService } from "./services/app.service";
import { AddCircle, Apps } from "@mui/icons-material";
import { LoginStatus } from "./types/LoginStatus";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import AbsenceSelector from "./components/AbsenceSelector";
import ProgramViewer from "./components/ProgramViewer";
import PersonalSchedule from "./components/Schedule/PersonalSchedule";
import { ScheduleEvent } from "./types/ScheduleEvent";
import { SLOT_TIMES } from "./types/Constants";
import RegisterProgramDialog from "./components/Workshoplist/RegisterProgramDialog";

interface Props {
  loginStatus: LoginStatus;
  wsList: Workshop[];
  wsKeywords: string[];
  schedule: ScheduleEvent[];
  setSchedule: (se: ScheduleEvent[]) => void;
}

function AppMain({
  loginStatus,
  wsList,
  wsKeywords,
  schedule,
  setSchedule,
}: Props) {
  const [saveInfoOpen, setSaveInfoOpen] = useState<boolean>(false);
  const [saveInfoMsg, setSaveInfoMsg] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<string>(
    loginStatus.loggedIn ? "schedule" : "viewonlycd "
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [programRegistration, setProgramRegistration] = useState<number[][]>(
    []
  );

  const [addedItems, setAddedItems] = useState<Workshop[]>([]);

  const [dialogItem, setDialogItem] = useState<Workshop | null>(null);
  const [dialogSlot, setDialogSlot] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [presentInProgram, setPresentInProgramSt] = useState<boolean[]>([
    true,
    true,
    true,
  ]);

  const loadRegistration = (present: boolean[]) => {
    let appSrv: AppService = new AppService();

    appSrv.getRegistration().then((prg: number[]) => {
      let tmpSchedule: ScheduleEvent[] = schedule.filter((n) => n.base);

      for (let i = 0; i < prg.length; i++) {
        let ws: Workshop | undefined = wsList.find((w) => w.id == prg[i]);
        if (ws != undefined) {
          let wws: Workshop = ws;
          let se: ScheduleEvent = {
            startTime: SLOT_TIMES[i].startTime,
            endTime: SLOT_TIMES[i].endTime,
            title: "(" + wws.id + ") " + wws.name,
            description: wws.author,
            type: "main_program",
            location: wws.location,
            workshopId: wws.id,
            base: false,
            slot: i + 1,
          };
          tmpSchedule.push(se);
        } else if (present[i]) {
          console.log(present);
          let se: ScheduleEvent = {
            startTime: SLOT_TIMES[i].startTime,
            endTime: SLOT_TIMES[i].endTime,
            title: "Tyhjä aikaväli",
            description:
              "Voit valita tähän aikaväliin ohjelman vapaana olevista ohjelmista.",
            type: "empty",
            location: null,
            workshopId: null,
            base: false,
            slot: i + 1,
          };
          tmpSchedule.push(se);
        } else {
          let se: ScheduleEvent = {
            startTime: SLOT_TIMES[i].startTime,
            endTime: SLOT_TIMES[i].endTime,
            title: "Vapaa-aika",
            description:
              "Olet merkinnyt pajauttimeen, että et osallistu ohjelmaan tänä aikana.",
            type: "general",
            location: null,
            workshopId: null,
            base: false,
            slot: i + 1,
          };
          tmpSchedule.push(se);
        }
      }

      appSrv.getOtherSchedule().then((osc) => {
        tmpSchedule.push(...osc);

        tmpSchedule = tmpSchedule.sort((a, b) => {
          if (a.startTime > b.startTime) return 1;
          if (b.startTime > a.startTime) return -1;
          return 0;
        });

        setSchedule([...tmpSchedule]);
      });
    });
  };

  useEffect(() => {
    let appSrv: AppService = new AppService();
    appSrv.getPresent().then((p: boolean[]) => {
      setPresentInProgramSt(p);
      if (!p[0] && !p[1] && !p[2]) setMasterSwitch(true);
      else setMasterSwitch(false);

      // Load registration after this to make things work right
      loadRegistration(p);
    });
  }, []);

  const setPresentInProgram = (p: boolean[]) => {
    setPresentInProgramSt(p);
    savePresence(p);
  };

  const [masterSwtich, setMasterSwitch] = useState<boolean>(false);

  const showInfoText = (info: string) => {
    setSaveInfoMsg(info);
    setSaveInfoOpen(true);
  };

  const setAndSaveAddedItems = (savedWorkshops: Workshop[]) => {
    let appSrv: AppService = new AppService();
    appSrv.setPreferences(savedWorkshops.map((i) => i.id)).then((reply) => {
      if (reply.status == "ok") {
        showInfoText("Ohjelmavalinnat tallennettu " + reply.date);
      } else {
        showInfoText("Virhe ohjelmavalintojen tallennuksessa");
      }
    });
    setAddedItems(savedWorkshops);
  };

  const savePresence = (pres: boolean[]) => {
    let appSrv: AppService = new AppService();
    appSrv.setPresent(pres).then((reply) => {
      if (reply.status == "ok") {
        showInfoText("Paikallaolo tallennettu " + reply.date);
      } else {
        showInfoText("Virhe paikallaolon tallennuksessa");
      }
    });
  };

  const showEmptySlotSelector = (slot: number) => {
    let appSrv: AppService = new AppService();
    appSrv.getProgramRegistration().then((reply) => {
      setProgramRegistration(reply);
      setSelectedSlot(slot);
      setSelectedPage("slot_select");
    });
  };

  const showProgramDialog = (program: Workshop, slot: number) => {
    setDialogItem(program);
    setDialogSlot(slot);
    setDialogOpen(true);
  };

  const saveProgramRegistration = (programId: number, slot: number) => {
    console.log("Add program " + programId + " to slot " + slot);
    let appSrv: AppService = new AppService();
    appSrv.saveRegistration(slot, programId).then((reply) => {
      if (reply.status == "ok") {
        showInfoText("Ohjelmavalinta tallennettu " + reply.date);
        loadRegistration(presentInProgram);
        setDialogOpen(false);
        setSelectedPage("schedule");
      } else {
        showInfoText(
          "Virhe ohjelmavalinnan tallennuksessa:" + reply.errorMessage
        );
      }
    });
  };

  useEffect(() => {
    let appSrv: AppService = new AppService();

    appSrv.getPreferences().then((prefs: number[]) => {
      let setItems: Workshop[] = [];
      prefs.forEach((p: number) => {
        let ws = wsList.find((a) => a.id == p);
        if (ws != null && ws != undefined) setItems.push(ws!);
      });

      setAddedItems(setItems);
    });
  }, []);

  return (
    <>
      {selectedPage == "schedule" ? (
        <PersonalSchedule
          schedule={schedule}
          showEmptySlotSelector={showEmptySlotSelector}
        />
      ) : selectedPage == "slot_select" ? (
        <Container
          maxWidth="xl"
          sx={{
            marginTop: "50px",
          }}
        >
          <Stack>
            <Alert
              severity="info"
              style={{ marginBottom: "20px", marginTop: "10px" }}
            >
              Valitse ohjelma aikaväliin {selectedSlot} painamalla
              <AddCircle />
              -painiketta.
              <Button
                onClick={(a) => {
                  setSelectedPage("schedule");
                }}
                style={{ marginLeft: "10px" }}
                variant="outlined"
              >
                Palaa ohjelmanäkymään
              </Button>
            </Alert>
            <WorkshopList
              items={wsList}
              filter={{
                freetext: "",
                types: [],
                tags: [],
                roverRecommended: null,
              }}
              addedItems={[]}
              setAddedItems={(i) => {}}
              viewOnly={false}
              selectSlot={selectedSlot}
              programRegisration={programRegistration}
              registerProgramCallback={showProgramDialog}
            />
          </Stack>
        </Container>
      ) : (
        <ProgramViewer
          loginStatus={loginStatus}
          wsList={wsList}
          wsKeywords={wsKeywords}
          presentInProgram={presentInProgram}
          setPresentInProgramSt={setPresentInProgram}
          addedItems={[]}
          setAndSaveAddedItems={setAndSaveAddedItems}
          setPresentInProgram={setPresentInProgram}
          setMasterSwitch={setMasterSwitch}
          masterSwtich={masterSwtich}
        />
      )}
      <Snackbar
        open={saveInfoOpen}
        message={saveInfoMsg}
        autoHideDuration={2000}
        onClose={() => setSaveInfoOpen(false)}
      />
      <RegisterProgramDialog
        item={dialogItem}
        slot={dialogSlot}
        addItemCallback={saveProgramRegistration}
        closeCallback={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  );
}

export default AppMain;
