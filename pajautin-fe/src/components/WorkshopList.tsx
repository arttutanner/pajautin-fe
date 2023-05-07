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
  console.log("Filter:" + filter.freetext);

  let matches = true;

  if (filter.freetext != null && filter.freetext.length > 0) {
    matches = false;
    if (ws.name.includes(filter.freetext)) matches = true;
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
