import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "react-bootstrap/esm/Stack";
import { ScheduleEvent } from "../../types/ScheduleEvent";
import ScheduleEventItem from "./ScheduleEventItem";
import { THEME_COLORS } from "../../types/Constants";

interface Props {
  schedule: ScheduleEvent[];
  showEmptySlotSelector: (slot: number) => void;
}

function PersonalSchedule({ schedule, showEmptySlotSelector }: Props) {
  return (
    <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
      <Card>
        <CardHeader
          title="Johtajatuliohjelmasi"
          subheader="Henkilökohtainen aikataulusi"
          style={{ backgroundColor: "#ddd" }}
        />
        <Stack gap={3}>
          {schedule.map((item) => (
            <ScheduleEventItem
              item={item}
              key={item.startTime + item.endTime}
              showEmptySlotSelector={showEmptySlotSelector}
            />
          ))}
        </Stack>
      </Card>
    </Container>
  );
}

export default PersonalSchedule;
