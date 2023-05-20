import { DropResult } from "react-beautiful-dnd";
import { Workshop } from "../types/Workshop";
import { reorder } from "../util/draggableHelpers";
import DraggableList from "./DragableList/DraggableList";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { render } from "react-dom";

interface Props {
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
}

function removeObjectWithId(arr: Workshop[], id: number) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id == id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

function SelectedWorkshops({ addedItems, setAddedItems }: Props) {
  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    let newItems = reorder(addedItems, source.index, destination.index);
    setAddedItems(newItems);
  };

  const removeAddedItem = (item: Workshop) => {
    console.log("Item to be deleted (id):" + item.id);
    let newItems = removeObjectWithId(addedItems, item.id);
    setAddedItems([...newItems]);
  };

  return (
    <Card>
      <CardHeader title={"Valitut työpajat"} />
      <CardContent>
        {addedItems.length == 0 ? "Et ole valinnut yhtään työpajaa" : ""}
        <DraggableList
          items={addedItems}
          onDragEnd={onDragEnd}
          onDeleteItem={(i) => removeAddedItem(i)}
        />
      </CardContent>
    </Card>
  );
}

export default SelectedWorkshops;
