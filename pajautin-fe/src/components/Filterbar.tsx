import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  createTheme,
  IconButtonProps,
  styled,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";

import { WorkshopFilter } from "../types/WorkshopFilter";
import { Avatar, Typography } from "@mui/material";
import { THEME_COLORS, TYPE_COLORS, TYPE_NAMES } from "../types/Constants";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "./ExpandMore";

interface Props {
  setFilters: (filter: WorkshopFilter) => void;
  keywords: string[];
}

let ct: number = 0;
let filters: WorkshopFilter = {
  freetext: "",
  roverRecommended: null,
  tags: [],
  types: [],
};
function Filterbar({ setFilters, keywords }: Props) {
  const setFilter = (name: string, value: any) => {
    if (value == null) return;

    if (name == "freetext") {
      filters.freetext = value!;
    }

    if (name == "tag") {
      filters.tags = [...filters.tags, value];
    }

    if (name == "type") {
      filters.types = [...filters.types, value];
    }

    if (name == "rover") filters.roverRecommended = value;

    setFilters({ ...filters });
  };

  const removeFilter = (name: string, value: any) => {
    if (name == "freetext") {
      filters.freetext = "";
    }

    if (name == "tag" && value != null) {
      filters.tags.splice(filters.tags.indexOf(value), 1);
    }

    if (name == "type" && value != null) {
      filters.types.splice(filters.types.indexOf(value), 1);
    }

    if (name == "rover") filters.roverRecommended = null;

    setFilters({ ...filters });
  };

  const resetFilters = () => {
    filters = { freetext: "", roverRecommended: null, tags: [], types: [] };
    setFilters({ ...filters });
  };

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

  const [expanded, setExpanded] = React.useState(bigScreen);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const filterCount = () => {
    return (
      (filters.freetext == "" ? 0 : 1) +
      (filters.roverRecommended == null || filters.roverRecommended == undefined
        ? 0
        : 1) +
      filters.tags.length +
      filters.types.length
    );
  };

  return (
    <Card>
      <CardHeader
        title="Suodattimet"
        subheader={
          filterCount() > 0
            ? filterCount() +
              " suodatin" +
              (filterCount() > 1 ? "ta" : "") +
              " käytössä."
            : "Ei suodattimia."
        }
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
          <p />
          {filterCount() == 0 ? (
            "Ei suodattimia."
          ) : (
            <>
              <Button variant="text" onClick={(e) => resetFilters()}>
                Tyhjennä
              </Button>
              <br />
            </>
          )}

          {filters.freetext != "" ? (
            <Chip
              key="freetext_deleteable"
              label={"Vapaateksti: " + filters.freetext}
              onDelete={(e) => removeFilter("freetext", null)}
              variant="outlined"
            />
          ) : (
            ""
          )}

          {filters.types.map((type) => (
            <Chip
              avatar={
                <Avatar
                  sx={{ bgcolor: TYPE_COLORS[type - 1] }}
                  aria-label={TYPE_NAMES[type - 1]}
                >
                  {type == 1 ? (
                    <EmojiPeopleIcon style={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                  {type == 2 ? (
                    <Diversity3Icon style={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                  {type == 3 ? (
                    <RecordVoiceOverIcon style={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                </Avatar>
              }
              label={TYPE_NAMES[type - 1]}
              variant="outlined"
              onDelete={(e) => removeFilter("type", type)}
              key={"deltype_" + type}
            />
          ))}

          {filters.roverRecommended != null &&
          filters.roverRecommended != undefined ? (
            <Chip
              label={
                filters.roverRecommended
                  ? "Vaeltajaraati suosittelee"
                  : "Ei suositusta"
              }
              variant="outlined"
              onDelete={(e) => removeFilter("rover", null)}
              avatar={
                <Avatar sx={{ bgcolor: "#ddd" }}>
                  <img
                    src={
                      (filters.roverRecommended ? "yes" : "no") + "_rover.png"
                    }
                  />
                </Avatar>
              }
            />
          ) : (
            ""
          )}

          {filters.tags.map((tag) => (
            <Chip
              label={tag}
              key={"deletetag_" + tag}
              onDelete={(e) => removeFilter("tag", tag)}
              variant="outlined"
            />
          ))}
          <p />
          <h5>Vapaatekstihaku</h5>
          <TextField
            id="searchterm"
            value={filters.freetext}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilter("freetext", event.target.value);
            }}
            label="Hakusana"
            variant="outlined"
          />
          <p />
          <h5>Ohjelman tyyppi</h5>
          {[1, 2, 3].map((type) =>
            filters.types.includes(type) ? (
              ""
            ) : (
              <Chip
                avatar={
                  <Avatar
                    sx={{ bgcolor: TYPE_COLORS[type - 1] }}
                    aria-label={TYPE_NAMES[type - 1]}
                  >
                    {type == 1 ? (
                      <EmojiPeopleIcon style={{ color: "white" }} />
                    ) : (
                      ""
                    )}
                    {type == 2 ? (
                      <Diversity3Icon style={{ color: "white" }} />
                    ) : (
                      ""
                    )}
                    {type == 3 ? (
                      <RecordVoiceOverIcon style={{ color: "white" }} />
                    ) : (
                      ""
                    )}
                  </Avatar>
                }
                label={TYPE_NAMES[type - 1]}
                variant="outlined"
                onClick={(e) => setFilter("type", type)}
                key={"type" + type}
              />
            )
          )}
          <p />
          <h5>Vaeltajaraadin suosittelema</h5>
          <Chip
            label="Vaeltajaraati suosittelee"
            variant="outlined"
            onClick={(e) => setFilter("rover", true)}
            avatar={
              <Avatar sx={{ bgcolor: "#ddd" }}>
                <img src="yes_rover.png" />
              </Avatar>
            }
          />
          <Chip
            label="Ei suositusta"
            variant="outlined"
            onClick={(e) => setFilter("rover", false)}
            avatar={
              <Avatar sx={{ bgcolor: "#ddd" }}>
                <img src="no_rover.png" />
              </Avatar>
            }
          />
          <p />
          <h5>Avainsanat</h5>
          {keywords.map((tag) =>
            filters.tags.includes(tag) ? (
              ""
            ) : (
              <Chip
                label={tag}
                key={tag}
                onClick={(e) => {
                  setFilter("tag", e.currentTarget.textContent);
                }}
                variant="outlined"
              />
            )
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Filterbar;
