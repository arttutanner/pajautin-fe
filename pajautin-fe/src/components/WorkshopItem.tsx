import React from "react";
import { Workshop } from "../types/Workshop";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface Props {
  item: Workshop;
}
function WorkshopItem({ item }: Props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <AddCircle />
          </IconButton>
        }
        title={item.name}
        subheader={item.author}
        style={{ backgroundColor: "#eee" }}
      />

      <CardContent>
        <img className="rounded float-left" src="ws_image_1.jpg" />
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default WorkshopItem;
