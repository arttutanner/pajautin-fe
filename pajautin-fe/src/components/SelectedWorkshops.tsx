import { DropResult } from "react-beautiful-dnd";
import { Workshop } from "../types/Workshop";
import { reorder } from "../util/draggableHelpers";
import DraggableList from "./DragableList/DraggableList";
import { wsItems } from "../workshopdata";
import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

interface Props {
  //items: Workshop[];
}

function SelectedWorkshops() {
  const [items, setItems] = React.useState([]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  return (
    <Card>
      <CardHeader title={"Valitut työpajat"} />
      <CardContent>
        {items.length == 0 ? "Et ole valinnut yhtään työpajaa" : ""}
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </CardContent>
    </Card>
  );
}

export default SelectedWorkshops;
