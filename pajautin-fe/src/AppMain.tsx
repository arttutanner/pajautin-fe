import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import WorkshopList from "./components/WorkshopList";
import { Workshop } from "./types/Workshop";
import Filterbar from "./components/Filterbar";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { WorkshopFilter } from "./types/WorkshopFilter";

import Container from "@mui/material/Container";
import PajautinAppBar from "./components/PajautinAppBar";
import SelectedWorkshops from "./components/SelectedWorkshops";

import { AppService } from "./services/app.service";
import { Apps } from "@mui/icons-material";
import { LoginStatus } from "./types/LoginStatus";
import { Snackbar, Stack } from "@mui/material";
import AbsenceSelector from "./components/AbsenceSelector";

interface Props {
  loginStatus: LoginStatus;
  wsList: Workshop[];
  wsKeywords: string[];
}

function AppMain({ loginStatus, wsList, wsKeywords }: Props) {
  let wsFilter: WorkshopFilter = {
    freetext: "",
    roverRecommended: null,
    tags: [],
    types: [],
  };
  const [saveInfoOpen, setSaveInfoOpen] = useState<boolean>(false);
  const [saveInfoMsg, setSaveInfoMsg] = useState<string>("");
  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);
  const [addedItems, setAddedItems] = useState<Workshop[]>([]);

  const showInfoText = (info: string) => {
    setSaveInfoMsg(info);
    setSaveInfoOpen(true);
  };

  const setAndSaveAddedItems = (savedWorkshops: Workshop[]) => {
    let appSrv: AppService = new AppService();
    appSrv.setPreferences(savedWorkshops.map((i) => i.id)).then((reply) => {
      if ((reply.status = "ok")) {
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
      if ((reply.status = "ok")) {
        showInfoText("Paikallaolo tallennettu " + reply.date);
      } else {
        showInfoText("Virhe paikallaolon tallennuksessa");
      }
    });
  };

  useEffect(() => {
    let appSrv: AppService = new AppService();

    appSrv.getPreferences().then((prefs: number[]) => {
      console.log("Prefs:");
      console.log(prefs);

      let setItems: Workshop[] = [];
      prefs.forEach((p: number) => {
        let ws = wsList.find((a) => a.id == p);
        if (ws != null && ws != undefined) setItems.push(ws!);
      });
      console.log("SetItems", setItems);

      setAddedItems(setItems);
      console.log(setItems);
    });
  }, []);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
      >
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Filterbar setFilters={setFilters} keywords={wsKeywords} />
          </Grid>
          <Grid item md={6}>
            <WorkshopList
              filter={filters}
              items={wsList}
              addedItems={addedItems}
              setAddedItems={setAndSaveAddedItems}
            />
          </Grid>
          <Grid item md={4}>
            <Stack>
              <SelectedWorkshops
                addedItems={addedItems}
                setAddedItems={setAndSaveAddedItems}
              />
              <p />
              <AbsenceSelector savePresence={savePresence} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "block",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Filterbar setFilters={setFilters} keywords={wsKeywords} />
          </Grid>
          <Grid item xs={12}>
            <SelectedWorkshops
              addedItems={addedItems}
              setAddedItems={setAndSaveAddedItems}
            />
          </Grid>
          <Grid item xs={12}>
            <AbsenceSelector savePresence={savePresence} />
          </Grid>
          <Grid item xs={12}>
            <WorkshopList
              filter={filters}
              items={wsList}
              addedItems={addedItems}
              setAddedItems={setAndSaveAddedItems}
            />
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={saveInfoOpen}
        message={saveInfoMsg}
        autoHideDuration={2000}
        onClose={() => setSaveInfoOpen(false)}
      />
    </>
  );
}

export default AppMain;
