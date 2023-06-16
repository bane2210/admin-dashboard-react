import { EventClickArg } from "@fullcalendar/core";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { tokens } from "../theme";
import { ConfirmDialogType } from "../scenes/Calendar/Calendar";

export default function ConfirmDialog({confirmDialog, handleClick}: {
  confirmDialog: ConfirmDialogType,
  handleClick: (selected: EventClickArg | null) => void,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog
      open={true}
      onClose={() => handleClick(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText fontSize="1.5rem" id="alert-dialog-description">
          {confirmDialog.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={() => handleClick(null)}>Disagree</Button>
        <Button color="secondary" onClick={() => handleClick(confirmDialog.payload)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
