import { DropResult } from "react-beautiful-dnd";
import { Workshop } from "../../types/Workshop";
import { reorder } from "../../util/draggableHelpers";
import DraggableList from "../DragableList/DraggableList";
import React, { useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  createTheme,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import { render } from "react-dom";
import ExpandMore from "../ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppService } from "../../services/app.service";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { PAJAUTIN_READ_ONLY, THEME_COLORS } from "../../types/Constants";

interface Props {
  addedItems: Workshop[];
  setAddedItems: (items: Workshop[]) => void;
  presentInProgram: boolean[];
}

function removeObjectWithId(arr: Workshop[], id: number) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id == id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

function SelectedWorkshops({
  addedItems,
  setAddedItems,
  presentInProgram,
}: Props) {
  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    let newItems = reorder(addedItems, source.index, destination.index);
    setAddedItems(newItems);
  };

  const removeAddedItem = (item: Workshop) => {
    let newItems = removeObjectWithId(addedItems, item.id);
    setAddedItems([...newItems]);
  };

  const theme = createTheme({
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },
  });

  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [expanded, setExpanded] = useState(bigScreen);

  const minimumNotSelected = () => {
    return addedItems.length < 10;
  };

  const noSpeechesInAllCategories = () => {
    let s1OK = false;
    let s2OK = false;
    let s3OK = false;
    addedItems.forEach((i) => {
      if (i.type == 3) {
        if (i.slot1 == "TRUE") s1OK = true;
        if (i.slot2 == "TRUE") s2OK = true;
        if (i.slot3 == "TRUE") s3OK = true;
      }
    });

    if (
      presentInProgram != null &&
      presentInProgram != undefined &&
      presentInProgram.length == 3
    ) {
      if (!presentInProgram[0]) s1OK = true;
      if (!presentInProgram[1]) s2OK = true;
      if (!presentInProgram[2]) s3OK = true;
    }

    if (s1OK && s2OK && s3OK) return false;
    let r = "Valitse ohjelmatoiveisiin puheenvuoro aikavälistä ";
    if (!s1OK && !s2OK && !s3OK) return r + " 1,2 ja 3.";
    let prob = [];
    if (!s1OK) prob.push(1);
    if (!s2OK) prob.push(2);
    if (!s3OK) prob.push(3);
    if (prob.length == 2) return r + prob[0] + " ja " + prob[1];
    return r + prob[0];
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={"Valitut ohjelmatoiveet"}
        subheader={
          addedItems.length > 0
            ? +addedItems.length +
              " ohjelma" +
              (addedItems.length > 1 ? "a" : "") +
              " valittu."
            : "Ei valittuja ohjelmia."
        }
        style={{ backgroundColor: THEME_COLORS.POUTA[50] }}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      {PAJAUTIN_READ_ONLY ? (
        <Alert severity="warning">
          Pajautin on katselutilassa, et voi muuttaa valintoja.
        </Alert>
      ) : (
        ""
      )}
      <Collapse in={expanded}>
        <CardContent>
          {addedItems.length == 0 ? "Et ole valinnut yhtään ohjelmaa" : ""}
          <DraggableList
            items={addedItems}
            onDragEnd={onDragEnd}
            onDeleteItem={(i) => removeAddedItem(i)}
          />
        </CardContent>
        {minimumNotSelected() ? (
          <Alert severity="warning">Valitse ainakin 10 ohjelmatoivetta.</Alert>
        ) : (
          <Alert severity="success">Ainakin 10 ohjelmatoivetta valittu.</Alert>
        )}
        {noSpeechesInAllCategories() ? (
          <Alert severity="warning">{noSpeechesInAllCategories()}</Alert>
        ) : (
          <Alert severity="success">
            Puheenvuorotoive valittu kaikista aikaväleistä.
          </Alert>
        )}
        {PAJAUTIN_READ_ONLY ? (
          ""
        ) : (
          <Alert severity="info">
            Voit vaihtaa ohjelmatoiveiden järjestystä vetämällä.
          </Alert>
        )}
      </Collapse>
    </Card>
  );
}

export default SelectedWorkshops;
