import React, { useState } from "react";
import { Workshop } from "../../types/Workshop";
import WorkshopItem from "./WorkshopItem";
import Stack from "@mui/material/Stack";

import { WorkshopFilter } from "../../types/WorkshopFilter";
import { Alert, Container } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

interface Props {
  items: Workshop[];
  filter: WorkshopFilter;
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
  viewOnly: boolean;
  selectSlot: number | null;
  programRegisration: number[][] | null;
  registerProgramCallback: ((program: Workshop, slot: number) => void) | null;
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
      ws.name,
      ws.author,
      ws.description,
      ws.speechAuthor1,
      ws.speechDescription1,
      ws.speechName1,
      ws.speechAuthor2,
      ws.speechDescription2,
      ws.speechName2,
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
    matchesTags = false;
    if (ws.keywords == null || ws.keywords == undefined) {
      matchesTags = false;
    } else {
      let tagsInWs = ws.keywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter((k) => k != "");
      filter.tags.forEach((tag) => {
        if (tagsInWs.includes(tag)) matchesTags = true;
      });
    }
  }

  if (filter.types.length > 0) {
    matchesType = false;
    filter.types.forEach((type) => {
      if (type == ws.type) matchesType = true;
    });
  }

  if (filter.roverRecommended != null && filter.roverRecommended != undefined) {
    matchesRover = false;
    if (filter.roverRecommended && ws.roverRecommended == "TRUE")
      matchesRover = true;
    if (!filter.roverRecommended && ws.roverRecommended != "TRUE")
      matchesRover = true;
  }

  return matchesFreetext && matchesRover && matchesTags && matchesType;
}

function doSlotFilter(
  selectSlot: number,
  programRegisration: number[][] | null,
  ws: Workshop
) {
  if (programRegisration == null) return false;

  let active = false;
  if (ws.act1 && selectSlot == 1) active = true;
  if (ws.act2 && selectSlot == 2) active = true;
  if (ws.act3 && selectSlot == 3) active = true;

  if (programRegisration[ws.id] == undefined) return true;
  if (programRegisration[ws.id][selectSlot - 1] == undefined) return true;

  return active && programRegisration[ws.id][selectSlot - 1] < ws.maxSize;
}

function WorkshopList({
  items,
  filter,
  addedItems,
  setAddedItems,
  viewOnly,
  selectSlot,
  programRegisration,
  registerProgramCallback,
}: Props) {
  const filteredWorkshops = items.filter((i) => {
    if (selectSlot == null || selectSlot == undefined)
      return doFilter(filter, i);
    else return doSlotFilter(selectSlot, programRegisration, i);
  });

  return (
    <Stack gap={3}>
      {filteredWorkshops.length == 0 ? (
        <Grid container spacing={-5}>
          <Alert severity="info">
            Hakuehtojasi vastaavia ohjelmia ei löytynyt.
          </Alert>
        </Grid>
      ) : (
        filteredWorkshops.map((item) => (
          <WorkshopItem
            key={item.id}
            item={item}
            addedItems={addedItems}
            setAddedItems={
              selectSlot == null
                ? setAddedItems
                : () => {
                    if (registerProgramCallback != null)
                      registerProgramCallback(item, selectSlot);
                  }
            }
            viewOnly={viewOnly}
            freeSpace={
              selectSlot == null
                ? null
                : programRegisration == null
                ? null
                : programRegisration[item.id] == null
                ? item.maxSize
                : item.maxSize - programRegisration[item.id][selectSlot - 1]
            }
          />
        ))
      )}
    </Stack>
  );
}

export default WorkshopList;
