import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import WorkshopList from "./components/WorkshopList";
import { Workshop } from "./types/Workshop";
import Filterbar from "./components/Filterbar";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { WorkshopFilter } from "./types/WorkshopFilter";
import { wsItems } from "./workshopdata";
import Container from "@mui/material/Container";
import PajautinAppBar from "./components/PajautinAppBar";
import SelectedWorkshops from "./components/SelectedWorkshops";

function App() {
  let wsFilter: WorkshopFilter = {
    freetext: "",
    levels: [],
    tags: [],
    types: [],
  };

  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);
  let ai: Workshop[] = [];
  ai.push(wsItems[4]);
  ai.push(wsItems[5]);

  const [addedItems, setAddedItems] = useState<Workshop[]>(ai);

  // const [addedItems, setAddedItems] = useState<Workshop[]>([...wsItems]);

  return (
    <div className="App">
      <PajautinAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Filterbar setFilters={setFilters} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WorkshopList
              filter={filters}
              items={wsItems}
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <SelectedWorkshops
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function hieno() {
  console.log("MarjoLiisa");
}

export default App;

/*
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Filterbar setFilters={setFilters} />
          </Col>
          <Col xs={12} lg={6}>
            <WorkshopList filter={filters} items={wsItems} />
          </Col>
        </Row>
      </Container>
    </div>
    */
