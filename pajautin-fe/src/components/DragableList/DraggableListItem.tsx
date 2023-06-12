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
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { TYPE_COLORS } from "../../types/Constants";
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
            <Avatar sx={{ bgcolor: "#aaa" }}>{index + 1}</Avatar>{" "}
            <Avatar
              sx={{
                bgcolor: TYPE_COLORS[item.type - 1],
                width: "20px",
                height: "20px",
                marginTop: "-15px",
                marginLeft: "-5px",
              }}
            >
              {item.type == 1 ? (
                <EmojiPeopleIcon style={{ color: "white" }} />
              ) : (
                ""
              )}
              {item.type == 2 ? (
                <Diversity3Icon style={{ color: "white" }} />
              ) : (
                ""
              )}
              {item.type == 3 ? (
                <RecordVoiceOverIcon style={{ color: "white" }} />
              ) : (
                ""
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<>{item.name}</>} secondary={item.author} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
