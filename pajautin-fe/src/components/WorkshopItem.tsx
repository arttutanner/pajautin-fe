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
  Stack,
  Typography,
} from "@mui/material";
import { TYPE_COLORS, TYPE_NAMES } from "../types/Constants";
import { AddCircle, ImageOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Speech from "./Speech";
import RegularWorkshop from "./RegularWorkshop";

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
          <>
            <Avatar
              sx={{ bgcolor: TYPE_COLORS[item.type - 1] }}
              aria-label={TYPE_NAMES[item.type - 1]}
            >
              {item.type == 1 ? <EmojiPeopleIcon /> : ""}
              {item.type == 2 ? <Diversity3Icon /> : ""}
              {item.type == 3 ? <RecordVoiceOverIcon /> : ""}
            </Avatar>
            {item.type == 3 ? (
              <Avatar
                sx={{
                  bgcolor: "#789",
                  width: "25px",
                  height: "25px",
                  marginTop: "-5px",
                  marginLeft: "-8px",
                }}
              >
                {item.slot1 == "TRUE" ? "1" : ""}
                {item.slot2 == "TRUE" ? "2" : ""}
                {item.slot3 == "TRUE" ? "3" : ""}
              </Avatar>
            ) : (
              ""
            )}
          </>
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
        style={{ backgroundColor: "#ddd" }}
      />

      {item.type == 3 ? (
        <Stack>
          <Speech
            title={item.speechName1}
            author={item.speechAuthor1}
            description={item.speechDescription1}
            imgUrl={item.imgUrl}
          />
          <Speech
            title={item.speechName2}
            author={item.speechAuthor2}
            description={item.speechDescription2}
            imgUrl={item.imgUrl2}
          />
        </Stack>
      ) : (
        <RegularWorkshop item={item} />
      )}

      {tags.length > 0 ? (
        <Container>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
          {item.roverRecommended == "TRUE" ? (
            <>
              <img src="rover_recommended.png" />
              <br />{" "}
            </>
          ) : (
            <>
              <br />
              <br />{" "}
            </>
          )}
        </Container>
      ) : (
        ""
      )}
    </Card>
  );
}

export default WorkshopItem;
