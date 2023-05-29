import React from "react";

import { Workshop } from "../types/Workshop";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  CardActions,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import { TYPE_COLORS, TYPE_NAMES } from "../types/Constants";
import { AddCircle, ImageOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

interface Props {
  item: Workshop;
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
}

function WorkshopItem({ item, addedItems, setAddedItems }: Props) {
  let itemAlreadyAdded = (item: Workshop) => {
    if (addedItems == null) return false;
    return addedItems.map((i) => i.id).includes(item.id);
  };

  let addToAdded = (item: Workshop) => {
    setAddedItems([...addedItems, item]);
  };

  const replaceBr = (text: string) => {
    if (text == undefined || text == null) return "";
    return text.replaceAll(/\n/g, "<br />");
  };

  const tags =
    item.keywords == null
      ? []
      : item.keywords
          .split(",")
          .map((k) => k.trim().toLocaleLowerCase())
          .filter((k) => k != "");

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: TYPE_COLORS[item.type - 1] }}
            aria-label={TYPE_NAMES[item.type - 1]}
          >
            {item.type == 1 ? <EmojiPeopleIcon /> : ""}
            {item.type == 2 ? <Diversity3Icon /> : ""}
            {item.type == 3 ? <RecordVoiceOverIcon /> : ""}
          </Avatar>
        }
        action={
          <IconButton
            disabled={itemAlreadyAdded(item)}
            aria-label="settings"
            onClick={() => {
              addToAdded(item);
            }}
          >
            <AddCircle />
          </IconButton>
        }
        title={item.name}
        subheader={item.author}
        style={{ backgroundColor: "#eee" }}
      />

      <CardContent>
        <Typography variant="body2">
          {item.imgUrl != null &&
          item.imgUrl != undefined &&
          item.imgUrl != "" ? (
            <div className="float-start m-2">
              <img className="rounded" src={item.imgUrl} />
            </div>
          ) : (
            ""
          )}
          <div
            dangerouslySetInnerHTML={{ __html: replaceBr(item.description) }}
          ></div>
        </Typography>
      </CardContent>

      {tags.length > 0 ? (
        <Container>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
          <br />
          <br />
        </Container>
      ) : (
        ""
      )}
    </Card>
  );
}

export default WorkshopItem;
