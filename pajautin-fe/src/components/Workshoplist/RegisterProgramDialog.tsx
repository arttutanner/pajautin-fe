import Dialog from "@mui/material/Dialog";
import { Workshop } from "../../types/Workshop";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button";

interface Props {
  item: Workshop | null;
  slot: number;
  addItemCallback: (programId: number, slot: number) => void;
  closeCallback: () => void;
  open: boolean;
}

function RegisterProgramDialog({
  closeCallback,
  addItemCallback,
  item,
  slot,
  open,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={closeCallback}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Haluatko ilmoittautua ohjelmaan?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Haluatko ilmoittautua ohjelmaan {item != null ? item.name : ""}{" "}
          aikavälissä {slot}?<br />
          Ilmoittautuminen on sitova, eikä sitä voi perua.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCallback}>Peruuta</Button>
        <Button
          onClick={(e) => {
            if (item != null) addItemCallback(item.id, slot);
          }}
          autoFocus
        >
          Vahvista ilmoittautuminen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterProgramDialog;
