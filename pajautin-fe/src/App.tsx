import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import WorkshopList from "./components/WorkshopList";
import { Workshop } from "./types/Workshop";
import Filterbar from "./components/Filterbar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { WorkshopFilter } from "./types/WorkshopFilter";
import { wsItems } from "./workshopdata";
import Container from "@mui/material/Container";
import PajautinAppBar from "./components/PajautinAppBar";

function App() {
  let wsFilter: WorkshopFilter = {
    freetext: "",
    levels: [],
    tags: [],
    types: [],
  };

  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);

  return (
    <div className="App">
      <PajautinAppBar />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item lg={2}>
            <Filterbar setFilters={setFilters} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WorkshopList filter={filters} items={wsItems} />
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
