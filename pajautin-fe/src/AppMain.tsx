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

  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);
  const [addedItems, setAddedItems] = useState<Workshop[]>([]);

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
    <div className="App">
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
              setAddedItems={setAddedItems}
            />
          </Grid>
          <Grid item md={4}>
            <SelectedWorkshops
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
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
              setAddedItems={setAddedItems}
            />
          </Grid>
          <Grid item xs={12}>
            <WorkshopList
              filter={filters}
              items={wsList}
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AppMain;
