import { DropResult } from "react-beautiful-dnd";
import { Workshop } from "../types/Workshop";
import { reorder } from "../util/draggableHelpers";
import DraggableList from "./DragableList/DraggableList";
import { wsItems } from "../workshopdata";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { render } from "react-dom";

interface Props {
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
}

function SelectedWorkshops({ addedItems, setAddedItems }: Props) {
  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    let newItems = reorder(addedItems, source.index, destination.index);
    setAddedItems(newItems);
  };

  return (
    <Card>
      <CardHeader title={"Valitut työpajat"} />
      <CardContent>
        {addedItems.length == 0 ? "Et ole valinnut yhtään työpajaa" : ""}
        <DraggableList items={addedItems} onDragEnd={onDragEnd} />
      </CardContent>
    </Card>
  );
}

export default SelectedWorkshops;
