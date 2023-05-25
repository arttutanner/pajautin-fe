import React, { useState } from "react";
import { Workshop } from "../types/Workshop";
import WorkshopItem from "./WorkshopItem";
import Stack from "@mui/material/Stack";

import { WorkshopFilter } from "../types/WorkshopFilter";
import { Container } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

interface Props {
  items: Workshop[];
  filter: WorkshopFilter;
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
}

function doFilter(filter: WorkshopFilter, ws: Workshop) {
  let matchesFreetext = true;
  let matchesTags = true;
  let matchesType = true;
  let matchesRover = true;

  // Match freetext in most of the fields, ignore case
  if (filter.freetext != null && filter.freetext.length > 0) {
    matchesFreetext = false;
    [
      ...ws.name,
      ws.author,
      ws.description,
      ws.author2,
      ws.name2,
      ws.description2,
      ws.keywords,
    ].forEach((field) => {
      if (
        field != null &&
        field != undefined &&
        field.toLowerCase().includes(filter.freetext.toLowerCase())
      )
        matchesFreetext = true;
    });
  }

  if (filter.tags.length > 0) {
    let tagsInWs = ws.keywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k != "");
    filter.tags.forEach((tag) => {
      if (!tagsInWs.includes(tag)) matchesTags = false;
    });
  }

  if (filter.types.length > 0) {
    matchesType = false;
    filter.types.forEach((type) => {
      if (type == ws.type) matchesType = true;
    });
  }

  return matchesFreetext && matchesRover && matchesTags && matchesType;
}

function WorkshopList({ items, filter, addedItems, setAddedItems }: Props) {
  const filteredWorkshops = items.filter((i) => doFilter(filter, i));

  return (
    <Stack gap={3}>
      {filteredWorkshops.length == 0 ? (
        <Grid container spacing={-5}>
          <h5>Hakuehtojasi vastaavia ohjelmia ei löytynyt.</h5>
        </Grid>
      ) : (
        filteredWorkshops.map((item) => (
          <WorkshopItem
            key={item.id}
            item={item}
            addedItems={addedItems}
            setAddedItems={setAddedItems}
          />
        ))
      )}
    </Stack>
  );
}

export default WorkshopList;
