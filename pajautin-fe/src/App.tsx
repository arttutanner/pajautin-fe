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

function App() {
  let wsFilter: WorkshopFilter = {
    freetext: "",
    levels: [],
    tags: [],
    types: [],
  };

  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);
  const [wsItems, setWsItems] = useState<Workshop[]>([]);
  const [addedItems, setAddedItems] = useState<Workshop[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    let appSrv: AppService = new AppService();
    appSrv.getWorkshops().then((ws) => {
      setWsItems(ws);
      let kw = getUniqueKeywords(ws);
      setKeywords(kw);
      //console.log(kw);

      appSrv.getPreferences().then((prefs) => {
        console.log("Prefs:");
        console.log(prefs);
        let setItems = ws.filter((v: Workshop) => [...prefs].includes(v.id));
        setAddedItems(setItems);
        console.log(setItems);
      });
    });
  }, []);

  return (
    <div className="App">
      <PajautinAppBar />
      <Container maxWidth="xl" sx={{ display: { sm: "none", lg: "block" } }}>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Filterbar setFilters={setFilters} keywords={keywords} />
          </Grid>
          <Grid item md={6}>
            <WorkshopList
              filter={filters}
              items={wsItems}
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
            <Filterbar setFilters={setFilters} keywords={keywords} />
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
              items={wsItems}
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function getUniqueKeywords(workshops: Workshop[]): string[] {
  let keywords: string[] = [];
  workshops.forEach((ws) => {
    if (!(ws.keywords == null))
      ws.keywords.split(",").forEach((kw) => {
        kw = kw.trim();
        if (kw != null && kw.length > 0) keywords.push(kw);
      });
  });

  return [...new Set(keywords)].sort();
}

export default App;
