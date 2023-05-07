import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import React from "react";

import Button from "react-bootstrap/Button";

import { WorkshopFilter } from "../types/WorkshopFilter";

interface Props {
  setFilters: (filter: WorkshopFilter) => void;
}

let ct: number = 0;
let filters: WorkshopFilter = {
  freetext: "",
  levels: [],
  tags: [],
  types: [],
};
function Filterbar({ setFilters }: Props) {
  let setFilter = (name: string, value: string) => {
    if (name == "freetext") {
      filters.freetext = value;
    }

    setFilters({ ...filters });
  };

  return (
    <Card>
      <CardHeader title="Suodattimet" />

      <CardContent>
        <TextField
          id="searchterm"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilter("freetext", event.target.value);
          }}
          label="Hakusana"
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
}

export default Filterbar;
