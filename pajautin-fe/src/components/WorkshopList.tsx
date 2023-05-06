import React, { useState } from "react";
import { Workshop } from "../types/Workshop";
import WorkshopItem from "./WorkshopItem";
import Stack from "@mui/material/Stack";

import { WorkshopFilter } from "../types/WorkshopFilter";

interface Props {
  items: Workshop[];
  filter: WorkshopFilter;
}

function WorkshopList({ items, filter }: Props) {
  return (
    <Stack gap={3}>
      {items.map((item) => (
        <WorkshopItem key={item.id} item={item} />
      ))}
    </Stack>
  );
}

export default WorkshopList;
