import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";

import WorkshopList from "./Workshoplist/WorkshopList";

import Filterbar from "./Filterbar";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import PajautinAppBar from "./PajautinAppBar";
import SelectedWorkshops from "./Workshoplist/SelectedWorkshops";

import { Apps } from "@mui/icons-material";

import { Snackbar, Stack } from "@mui/material";
import { LoginStatus } from "../types/LoginStatus";
import { Workshop } from "../types/Workshop";
import { WorkshopFilter } from "../types/WorkshopFilter";
import AbsenceSelector from "./AbsenceSelector";

interface Props {
  loginStatus: LoginStatus;
  wsList: Workshop[];
  wsKeywords: string[];
  presentInProgram: boolean[];
  setPresentInProgramSt: (pr: boolean[]) => void;
  addedItems: Workshop[];
  setAndSaveAddedItems: (items: Workshop[]) => void;
  setPresentInProgram: (p: boolean[]) => void;
  setMasterSwitch: (s: boolean) => void;
  masterSwtich: boolean;
}

function ProgramViewer({
  loginStatus,
  wsList,
  wsKeywords,
  presentInProgram,
  setPresentInProgramSt,
  addedItems,
  setAndSaveAddedItems,
  setPresentInProgram,
  setMasterSwitch,
  masterSwtich,
}: Props) {
  let wsFilter: WorkshopFilter = {
    freetext: "",
    roverRecommended: null,
    tags: [],
    types: [],
  };
  const [filters, setFilters] = useState<WorkshopFilter>(wsFilter);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
          marginTop: "50px",
        }}
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
              viewOnly={loginStatus.viewOnly}
              selectSlot={null}
              programRegisration={null}
              registerProgramCallback={null}
            />
          </Grid>
          {loginStatus.viewOnly ? (
            ""
          ) : (
            <Grid item md={4}>
              <Stack>
                <SelectedWorkshops
                  addedItems={addedItems}
                  setAddedItems={setAndSaveAddedItems}
                  presentInProgram={presentInProgram}
                />
                <div style={{ marginTop: "25px" }} />
                <AbsenceSelector
                  setPresentInProgram={setPresentInProgram}
                  setMasterSwitch={setMasterSwitch}
                  presentInProgram={presentInProgram}
                  masterSwitch={masterSwtich}
                />
              </Stack>
            </Grid>
          )}
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
          marginTop: "60px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Filterbar setFilters={setFilters} keywords={wsKeywords} />
          </Grid>
          {loginStatus.viewOnly ? (
            ""
          ) : (
            <>
              <Grid item xs={12}>
                <SelectedWorkshops
                  addedItems={addedItems}
                  setAddedItems={setAndSaveAddedItems}
                  presentInProgram={presentInProgram}
                />
              </Grid>

              <Grid item xs={12}>
                <AbsenceSelector
                  setPresentInProgram={setPresentInProgram}
                  setMasterSwitch={setMasterSwitch}
                  presentInProgram={presentInProgram}
                  masterSwitch={masterSwtich}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <WorkshopList
              filter={filters}
              items={wsList}
              addedItems={addedItems}
              setAddedItems={setAndSaveAddedItems}
              viewOnly={loginStatus.viewOnly}
              selectSlot={null}
              programRegisration={null}
              registerProgramCallback={null}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProgramViewer;
