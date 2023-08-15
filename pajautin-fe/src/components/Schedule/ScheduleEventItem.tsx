import Card from "@mui/material/Card";
import { ScheduleEvent } from "../../types/ScheduleEvent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Button, CardContent } from "@mui/material";
import { THEME_COLORS } from "../../types/Constants";

interface Props {
  item: ScheduleEvent;
  showEmptySlotSelector: (slot: number) => void;
}

function ScheduleEventItem({ item, showEmptySlotSelector }: Props) {
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
      " - " +
      ("0" + end.getHours()).slice(-2) +
      ":" +
      ("0" + end.getMinutes()).slice(-2)
    );
  };

  let getColor = () => {
    if (item.type == "general") return THEME_COLORS.HIILI[50];
    if (item.type == "main_program") return THEME_COLORS.LIESKA[80];
    if (item.type == "side_program") return THEME_COLORS.METSALAMPI[80];
    if (item.type == "food") return THEME_COLORS.LOIMU[80];
    return "white";
  };

  return (
    <Card style={{ backgroundColor: getColor() }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        title={item.title}
        subheader={getDateString()}
      />
      {item.description == null || item.description == undefined ? (
        ""
      ) : (
        <CardContent>
          <Typography component="div">{item.description}</Typography>
          {item.type == "empty" ? (
            <Button
              variant="contained"
              title="Valitse ohjelma"
              onClick={(a) => {
                showEmptySlotSelector(item.slot == undefined ? -1 : item.slot);
              }}
            >
              Valitse ohjelma
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
