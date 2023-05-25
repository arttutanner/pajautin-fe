import { AddCircle } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Workshop } from "../../types/Workshop";

export type DraggableListItemProps = {
  item: Workshop;
  index: number;
  onDelete: () => void;
};

const DraggableListItem = ({
  item,
  index,
  onDelete,
}: DraggableListItemProps) => {
  //const classes = useStyles();
  return (
    <Draggable draggableId={item.id + ""} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete()}
            >
              <DeleteIcon />
            </IconButton>
          }
          // className={snapshot.isDragging ? classes.draggingListItem : ""}
        >
          <ListItemAvatar>
            <Avatar>{index + 1}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.author} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
