import React, { useState, useEffect } from "react";

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
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./ModalDialog.scss";

const ModalDialog = () => {
  const initialReminderState: ReminderType = {
    id: 0,
    name: "",
    date: dayjs().format(calendarDateFormat),
  };

  // *** form hook ***
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  // ** redux hooks ***
  const selectedReminder = useAppSelector(selectReminder);
  const selectedDay = useAppSelector(selectDay);
  const showModal = useAppSelector(selectShowReminderModal);
  const dispatch = useAppDispatch();

  // *** react hooks ***
  const [reminder, setReminder] = useState(initialReminderState);
  const [showEditMode, setShowEditMode] = useState(false);
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
    setShowEditMode(selectedReminder === null);
    clearErrors();
  }, [selectedReminder, selectedDay, showModal]);

  // *** react-query ****
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

  // *** action handlers ***
  const handleClose = () => {
    dispatch(setSelectedDate(null));
    dispatch(closeReminderModal());
    setShowEditMode(false);
  };

  const handelDelete = () => {
    deleteMutation.mutate(selectedReminder!.id);
    dispatch(closeReminderModal());
  };

  const onSuccessSubmit = () => {
    if (selectedReminder === null) {
      addMutation.mutate(reminder);
    } else {
      updateMutation.mutate(reminder);
    }
    dispatch(closeReminderModal());
    setShowEditMode(false);
  };

  // *** validators ***
  const isValidTime = () => reminder.date !== "Invalid Date";

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle className="modal_title">
            {selectedReminder ? (
              <>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={handelDelete}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => setShowEditMode(true)}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </>
            ) : null}
            <IconButton
              aria-label="close"
              color="primary"
              onClick={handleClose}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {showEditMode ? null : (
              <div className="modal_reminderDescription">
                <div className="modal_reminderDescriptionTitle">
                  {reminder.name}
                </div>
                <div>
                  {dayjs(reminder.date, reminderDateFormat).format(
                    "D MMMM YYYY h:m A"
                  )}
                </div>
              </div>
            )}

            {showEditMode ? (
              <div>
                <TextField
                  {...register("reminderName", {
                    required: true,
                    maxLength: 30,
                  })}
                  autoFocus
                  value={reminder.name}
                  onChange={(newName) => {
                    setReminder({ ...reminder, name: newName.target.value });
                  }}
                  margin="dense"
                  id="reminderName"
                  label="Reminder name"
                  type="reminderName"
                  fullWidth
                  variant="standard"
                  error={"reminderName" in errors}
                  //TODO separate "empty" and "more than 30" error messages
                  helperText={
                    "reminderName" in errors
                      ? "Please, enter text maximum 30 characters long."
                      : ""
                  }
                  onClick={() => {
                    console.log(errors);
                  }}
                />
                <DateTimePicker
                  {...register("time", {
                    required: true,
                    validate: isValidTime,
                  })}
                  renderInput={(params) => <TextField {...params} />}
                  value={dayjs(reminder?.date, calendarDateFormat)}
                  onChange={(newDate) => {
                    setReminder({
                      ...reminder,
                      date: dayjs(newDate).format(reminderDateFormat),
                    });
                  }}
                />
              </div>
            ) : null}
          </DialogContent>
          {showEditMode ? (
            <div>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(() => onSuccessSubmit())}>
                  Apply
                </Button>
              </DialogActions>
            </div>
          ) : null}
        </Dialog>
      </LocalizationProvider>
    </div>
  );
};

export default ModalDialog;
