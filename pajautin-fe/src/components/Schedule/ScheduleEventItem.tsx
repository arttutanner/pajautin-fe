import Card from "@mui/material/Card";
import { ScheduleEvent } from "../../types/ScheduleEvent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Avatar, Button, CardContent, Chip } from "@mui/material";
import {
  AFTER_REGISTRATION_OPEN,
  MAP_COLORS,
  THEME_COLORS,
} from "../../types/Constants";

interface Props {
  item: ScheduleEvent;
  showEmptySlotSelector: (slot: number) => void;
  swapAllowed: boolean;
}

function ScheduleEventItem({
  item,
  showEmptySlotSelector,
  swapAllowed,
}: Props) {
  let getDateString = () => {
    let start = new Date(Date.parse(item.startTime));
    let end = new Date(Date.parse(item.endTime));
    let wDay = "";
    if (start.getDay() == 0) wDay = "Su";
    if (start.getDay() == 5) wDay = "Pe";
    if (start.getDay() == 6) wDay = "La";

    return (
      wDay +
      " " +
      ("0" + start.getHours()).slice(-2) +
      ":" +
      ("0" + start.getMinutes()).slice(-2) +
      (item.endTime != null && item.endTime != undefined
        ? " - " +
          ("0" + end.getHours()).slice(-2) +
          ":" +
          ("0" + end.getMinutes()).slice(-2)
        : "")
    );
  };

  let getColor = () => {
    if (item.type == "general") return THEME_COLORS.HIILI[50];
    if (item.type == "main_program") return THEME_COLORS.LIESKA[80];
    if (item.type == "side_program") return THEME_COLORS.METSALAMPI[80];
    if (item.type == "evening_program") return THEME_COLORS.METSALAMPI[50];
    if (item.type == "job") return THEME_COLORS.POUTA[50];
    if (item.type == "food") return THEME_COLORS.LOIMU[80];
    return "white";
  };

  let getMapColor = () => {
    if (item.location == null || item.location == undefined) return "#FFFFFF";
    // For short items, assume it is a map marker (e.q. D12)
    if (item.location.length < 4) {
      return MAP_COLORS[
        item.location.toUpperCase().charAt(0) as keyof typeof MAP_COLORS
      ];
    }

    if (
      item.workshopId != null &&
      item.workshopId != undefined &&
      item.workshopId > 299
    ) {
      return MAP_COLORS["stage"];
    }

    if (item.type == "main_program") return MAP_COLORS["stage"];

    return MAP_COLORS["other"];
  };

  let openMap = () => {
    window.open(
      "https://www.google.com/maps/d/u/0/viewer?mid=1SUqYYz-5erfk5jxjhSLLE2vPj2DCIW0&ll=61.206655345287466%2C25.12216937329562&z=19",
      "_blank",
      "noreferrer"
    );
  };

  return (
    <Card style={{ backgroundColor: getColor() }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        title={
          <>
            {item.title}
            {item.location != null && item.location != undefined ? (
              <Chip
                onClick={openMap}
                label={item.location}
                style={{
                  marginLeft: "10px",
                  background: getMapColor(),
                  fontSize: "17px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "white",
                }}
              />
            ) : (
              ""
            )}
          </>
        }
        subheader={getDateString()}
      />
      {item.description == null || item.description == undefined ? (
        ""
      ) : (
        <CardContent>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
          {(item.type == "empty" ||
            (item.workshopId != undefined &&
              item.workshopId >= 300 &&
              swapAllowed)) &&
          AFTER_REGISTRATION_OPEN ? (
            <Button
              variant="contained"
              title={swapAllowed ? "Vaihda ohjelma" : "Valitse ohjelma"}
              onClick={(a) => {
                showEmptySlotSelector(item.slot == undefined ? -1 : item.slot);
              }}
            >
              {swapAllowed ? "Vaihda ohjelma" : "Valitse ohjelma"}
            </Button>
          ) : (
            ""
          )}
        </CardContent>
      )}
    </Card>
  );
}
export default ScheduleEventItem;
