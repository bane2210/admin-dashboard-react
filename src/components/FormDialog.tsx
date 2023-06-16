import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormDialogType } from '../scenes/Calendar/Calendar';
import { DateSelectArg } from '@fullcalendar/core';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

export default function FormDialog({formDialog, handleClick}: {
    formDialog: FormDialogType,
    handleClick: (selected: DateSelectArg | null, input: string) => void,
  }) {
    const [input, setInput] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (

      <Dialog open={true} onClose={() => handleClick(null, "")}>
        <DialogTitle>{formDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize='1.5rem' >
            {formDialog.content}
          </DialogContentText>
          <TextField
            color='secondary'
            autoFocus
            margin="dense"
            id="newEvent"
            label="New event"
            type="text"
            fullWidth
            variant="standard"
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary"  onClick={() => handleClick(null, "")}>Cancel</Button>
          <Button disabled={input === ""}  color="secondary"  onClick={() => handleClick(formDialog.payload, input)}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}