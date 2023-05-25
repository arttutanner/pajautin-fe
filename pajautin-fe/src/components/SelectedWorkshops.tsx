import { DropResult } from "react-beautiful-dnd";
import { Workshop } from "../types/Workshop";
import { reorder } from "../util/draggableHelpers";
import DraggableList from "./DragableList/DraggableList";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  createTheme,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import { render } from "react-dom";
import ExpandMore from "./ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppService } from "../services/app.service";

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
    let appSrv: AppService = new AppService();
    appSrv.setPreferences(newItems.map((i) => i.id)).then((reply) => {
      if ((reply.status = "ok")) {
        setSaveInfoMsg("Tiedot tallennettu " + reply.date);
      } else {
        setSaveInfoMsg("Virhe tietojen tallennuksessa");
      }
      setSaveInfoOpen(true);
    });
  };

  const removeAddedItem = (item: Workshop) => {
    console.log("Item to be deleted (id):" + item.id);
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
  const [saveInfoOpen, setSaveInfoOpen] = useState<boolean>(false);
  const [saveInfoMsg, setSaveInfoMsg] = useState<string>("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={"Valitut työpajat"}
          subheader={
            addedItems.length > 0
              ? +addedItems.length +
                " työpaja" +
                (addedItems.length > 1 ? "a" : "") +
                " valittu"
              : "Ei valittuja työpajoja."
          }
          style={{ backgroundColor: "#eef" }}
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
        <Collapse in={expanded}>
          <CardContent>
            {addedItems.length == 0 ? "Et ole valinnut yhtään työpajaa" : ""}
            <DraggableList
              items={addedItems}
              onDragEnd={onDragEnd}
              onDeleteItem={(i) => removeAddedItem(i)}
            />
          </CardContent>
        </Collapse>
      </Card>
      <Snackbar
        open={saveInfoOpen}
        message={saveInfoMsg}
        autoHideDuration={2000}
        onClose={() => setSaveInfoOpen(false)}
      />
    </>
  );
}

export default SelectedWorkshops;
