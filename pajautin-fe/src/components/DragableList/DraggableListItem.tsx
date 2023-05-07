import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Workshop } from "../../types/Workshop";

export type DraggableListItemProps = {
  item: Workshop;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  //const classes = useStyles();
  return (
    <Draggable draggableId={item.id + ""} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className={snapshot.isDragging ? classes.draggingListItem : ""}
        >
          <ListItemAvatar>
            <Avatar>P</Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.author} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
