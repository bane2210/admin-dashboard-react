import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg, formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ConfirmDialog from "../../components/ConfirmDialog";
import FormDialog from "../../components/FormDialog";

type DialogType = {
  open: boolean;
  title: string;
  content: string;
};

export type ConfirmDialogType = {
  payload: EventClickArg | null;
} & DialogType;

export type FormDialogType = {
  input: string;
  payload: DateSelectArg | null;
} & DialogType;

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    open: false,
    title: "",
    content: "",
    payload: null,
  });

  const [formDialog, setFormDialog] = useState<FormDialogType>({
    open: false,
    title: "",
    content: "",
    input: "",
    payload: null,
  })

  const openFormDialog = (select: DateSelectArg) => {
    setFormDialog({ open: true, title: "New Event", content: "Please enter new event", input: "", payload: select });
  };

  const handleFormDialog = (selected: DateSelectArg | null, title: string) => {

    setFormDialog({ open: false, title: "", content: "", input: "", payload: null });
    
    if(!selected || !title) {
      return;
    }
 
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const confirmDialogOpened = (selected: EventClickArg) => {
    setConfirmDialog({
      open: true,
      title: "Delete Event",
      content: "Are you sure you want to delete the event?",
      payload: selected,
    });
  };

  const handleEventClick = (selected: EventClickArg | null) => {
    if (selected) {
      selected.event.remove();
    }

    setConfirmDialog({
      open: false,
      title: "",
      content: "",
      payload: null,
    });
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      {confirmDialog.open && (
        <ConfirmDialog
          confirmDialog={confirmDialog}
          handleClick={handleEventClick}
        />
      )}

      { formDialog.open && (
        <FormDialog formDialog={formDialog} handleClick={handleFormDialog} />
      ) }

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          bgcolor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event: any) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={openFormDialog}
            eventClick={confirmDialogOpened}
            eventsSet={(events: any) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
