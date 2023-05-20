import React, { useState } from "react";
import { Workshop } from "../types/Workshop";
import WorkshopItem from "./WorkshopItem";
import Stack from "@mui/material/Stack";

import { WorkshopFilter } from "../types/WorkshopFilter";

interface Props {
  items: Workshop[];
  filter: WorkshopFilter;
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
}

function doFilter(filter: WorkshopFilter, ws: Workshop) {
  let matches = true;

  // Match freetext in most of the fields, ignore case
  if (filter.freetext != null && filter.freetext.length > 0) {
    matches = false;
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
        matches = true;
    });
  }

  return matches;
}

function WorkshopList({ items, filter, addedItems, setAddedItems }: Props) {
  return (
    <Stack gap={3}>
      {items
        .filter((i) => doFilter(filter, i))
        .map((item) => (
          <WorkshopItem
            key={item.id}
            item={item}
            addedItems={addedItems}
            setAddedItems={setAddedItems}
          />
        ))}
    </Stack>
  );
}

export default WorkshopList;
