import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";
import Button from "react-bootstrap/Button";

import { WorkshopFilter } from "../types/WorkshopFilter";

interface Props {
  setFilters: (filter: WorkshopFilter) => void;
  keywords: string[];
}

let ct: number = 0;
let filters: WorkshopFilter = {
  freetext: "",
  levels: [],
  tags: [],
  types: [],
};
function Filterbar({ setFilters, keywords }: Props) {
  let setFilter = (name: string, value: string | null) => {
    if (value == null) return;

    if (name == "freetext") {
      filters.freetext = value!;
    }

    if (name == "tag") {
      filters.tags = [...filters.tags, value];
    }

    setFilters({ ...filters });
  };

  let removeFilter = (name: string, value: string | null) => {
    if (name == "freetext") {
      filters.freetext = "";
    }

    if (name == "tag" && value != null) {
      filters.tags.splice(filters.tags.indexOf(value));
    }

    setFilters({ ...filters });
  };

  return (
    <Card>
      <CardHeader title="Suodattimet" />

      <CardContent>
        {filters.freetext == "" &&
        filters.types.length == 0 &&
        filters.tags.length == 0
          ? "Ei suodattimia."
          : ""}

        {filters.freetext != "" ? (
          <Chip
            key="freetext_deleteable"
            label={"Vapaateksti: " + filters.freetext}
            onDelete={(e) => removeFilter("freetext", null)}
          />
        ) : (
          ""
        )}

        {filters.tags.map((tag) => (
          <Chip
            label={tag}
            key={"deletetag_" + tag}
            onDelete={(e) => removeFilter("tag", tag)}
          />
        ))}

        <TextField
          id="searchterm"
          value={filters.freetext}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilter("freetext", event.target.value);
          }}
          label="Hakusana"
          variant="outlined"
        />
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
    </Card>
  );
}

export default Filterbar;
