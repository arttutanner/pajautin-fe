import { Alert, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "react-bootstrap/esm/Stack";
import { ScheduleEvent } from "../../types/ScheduleEvent";
import ScheduleEventItem from "./ScheduleEventItem";
import { AFTER_REGISTRATION_OPEN, THEME_COLORS } from "../../types/Constants";

interface Props {
  schedule: ScheduleEvent[];
  showEmptySlotSelector: (slot: number) => void;
}

function PersonalSchedule({ schedule, showEmptySlotSelector }: Props) {
  let speechCount = 0;
  schedule.forEach((sc) => {
    if (
      sc.workshopId != undefined &&
      sc.workshopId != null &&
      sc.workshopId >= 300
    )
      speechCount++;
  });

  return (
    <Container maxWidth="xl" sx={{ marginTop: "50px", marginBottom: "20px" }}>
      <Card>
        <CardHeader
          title="Johtajatuliohjelmasi"
          subheader="Henkilökohtainen aikataulusi"
          style={{ backgroundColor: "#ddd" }}
        />

        {speechCount == 3 && AFTER_REGISTRATION_OPEN ? (
          <Alert severity="info">
            Sinulla on kolme puheenvuoroa. Saat halutessasi vaihtaa niistä yhden
            ja valita tilalle ohjelman, jossa on vapaata.
          </Alert>
        ) : (
          ""
        )}

        <Stack gap={3} style={{ marginTop: "20px" }}>
          {schedule.map((item) => (
            <ScheduleEventItem
              swapAllowed={speechCount == 3}
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
