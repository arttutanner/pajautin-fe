import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  createTheme,
  FormControlLabel,
  Snackbar,
  Stack,
  Switch,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMore from "./ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppService } from "../services/app.service";
import { THEME_COLORS } from "../types/Constants";

interface Props {
  setPresentInProgram: (pres: boolean[]) => void;
  presentInProgram: boolean[];
  masterSwitch: boolean;
  setMasterSwitch: (ms: boolean) => void;
}

function AbsenceSelector({
  setPresentInProgram,
  presentInProgram,
  masterSwitch,
  setMasterSwitch,
}: Props) {
  const theme = createTheme({
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },
  });
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [expanded, setExpanded] = useState(bigScreen);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const setPresent = (slot: number, present: boolean) => {
    var p: boolean[] = [...presentInProgram];
    p[slot] = present;
    setPresentInProgram([...p]);
    if (present) {
      console.log("Masterswitch to false.");
      setMasterSwitch(false);
    }
    if (!p[0] && !p[1] && !p[2]) setMasterSwitch(true);
  };

  const setAll = (selected: boolean) => {
    setPresentInProgram([!selected, !selected, !selected]);
    setMasterSwitch(selected);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={"Läsnäolo"}
          subheader={verbalizeAbsence(presentInProgram)}
          style={{ backgroundColor: THEME_COLORS.POUTA[50] }}
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
        />
        <Collapse in={expanded}>
          <CardContent>
            Valitse aikavälit, jolloin osallitut ohjelmaan.
            <Stack style={{ marginTop: "15px" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={presentInProgram[0]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPresent(0, event.target.checked)
                    }
                  />
                }
                label="Aikaväli 1 (la klo 11:00 - 12:15)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={presentInProgram[1]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPresent(1, event.target.checked)
                    }
                  />
                }
                label="Aikaväli 2 (la klo 14:00 - 15:15)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={presentInProgram[2]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPresent(2, event.target.checked)
                    }
                  />
                }
                label="Aikaväli 3 (la klo 15:45 - 17:00)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={masterSwitch}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setAll(event.target.checked)
                    }
                  />
                }
                label="En osallistu työpajoihin, vertaisverstaisiin tai puheenvuoroihin."
              />
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

function verbalizeAbsence(present: boolean[]): string {
  let pCt = (present[0] ? 1 : 0) + (present[1] ? 1 : 0) + (present[2] ? 1 : 0);

  if (pCt == 3) return "Osallistut ohjelmiin kaikissa aikaväleissä.";

  if (pCt == 0)
    return "Et osallistu työpajoihin, vertaisverstaisiin tai puheenvuoroihin.";

  if (pCt == 2) {
    if (present[0] && present[1])
      return "Osallistut ohjelmiin aikaväleissä 1 ja 2.";
    if (present[1] && present[2])
      return "Osallistut ohjelmiin aikaväleissä 2 ja 3.";
    if (present[0] && present[2])
      return "Osallistut ohjelmiin aikaväleissä 1 ja 3.";
  }

  if (pCt == 1) {
    if (present[0]) return "Osallistut ohjelmaan aikavälissä 1";
    if (present[1]) return "Osallistut ohjelmaan aikavälissä 2";
    if (present[2]) return "Osallistut ohjelmaan aikavälissä 3";
  }

  return "";
}

export default AbsenceSelector;
