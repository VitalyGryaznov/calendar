import React, { useState, useContext, useEffect } from "react";

import {
  ReminderType,
  calendarDateFormat,
  reminderDateFormat,
} from "../../types";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectReminder,
  selectShowReminderModal,
  closeReminderModal,
  selectDay,
  setSelectedDate,
} from "../../redux/Slice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useForm } from "react-hook-form";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  updateReminder,
  addReminder,
  deleteReminder,
} from "../../api/remindersApi";
import { useMutation, useQueryClient } from "react-query";

const ModalDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //TODO handle errors

  const initialReminderState: ReminderType = {
    id: 0,
    name: "",
    date: dayjs().format(calendarDateFormat),
  };
  const [reminder, setReminder] = useState(initialReminderState);

  const selectedReminder = useAppSelector(selectReminder);
  const selectedDay = useAppSelector(selectDay);
  const showModal = useAppSelector(selectShowReminderModal);

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  //TODO cokmbine invalidations
  const updateMutation = useMutation(updateReminder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reminders"]);
    },
  });
  const addMutation = useMutation(addReminder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reminders"]);
    },
  });
  const deleteMutation = useMutation(deleteReminder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reminders"]);
    },
  });

  useEffect(() => {
    setReminder(
      selectedReminder === null
        ? {
            ...initialReminderState,
            date: dayjs(selectedDay, calendarDateFormat).format(
              reminderDateFormat
            ),
          }
        : selectedReminder
    );
  }, [selectedReminder, selectedDay]);

  const handleClose = () => {
    dispatch(setSelectedDate(null));
    dispatch(closeReminderModal());
  };

  const handelDelete = () => {
    deleteMutation.mutate(selectedReminder!.id);
    dispatch(closeReminderModal());
  };

  const onSuccessSubmit = () => {
    if (selectedReminder === null) {
      console.log("Adding");
      addMutation.mutate(reminder);
    } else {
      updateMutation.mutate(reminder);
    }
    dispatch(closeReminderModal());
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle>Reminder</DialogTitle>
          {selectedReminder ? (
            <button onClick={handelDelete}>delete</button>
          ) : null}

          <DialogContent>
            <DialogContentText>
              {selectedReminder ? "Edit reminder" : "Create reminder"}
            </DialogContentText>
            <TextField
              {...register("first", { required: true, maxLength: 30 })}
              autoFocus
              value={reminder.name}
              onChange={(newName) => {
                setReminder({ ...reminder, name: newName.target.value });
              }}
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />

            <DateTimePicker
              {...register("time", { required: true })}
              renderInput={(params) => <TextField {...params} />}
              value={dayjs(reminder?.date, calendarDateFormat)}
              onChange={(newDate) => {
                setReminder({
                  ...reminder,
                  date: dayjs(newDate).format(reminderDateFormat),
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(() => onSuccessSubmit())}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
};

export default ModalDialog;
