import React, { useState, useContext, useEffect } from "react";

import { ReminderType } from "../../types";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectYear, selectMonth, selectReminder, selectShowReminderModal, closeReminderModal, incrementMonth } from "../../redux/Slice";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useForm } from "react-hook-form";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface CollectionCreateFormProps {
  onCreate: (payload: any) => void;
}


const ModalDialog: React.FC<CollectionCreateFormProps> = ({ onCreate }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
  
  const initialReminderState: ReminderType = {
    id: 0,
    name: "",
    date: dayjs(),
  };
  const [reminder, setReminder] = useState(initialReminderState);
  const selectedMonth = useAppSelector(selectMonth);
  const selectedYear = useAppSelector(selectYear);
  const selectedReminder = useAppSelector(selectReminder);
  const showModal = useAppSelector(selectShowReminderModal);

  const dispatch = useAppDispatch();


  /*useEffect(() => {
    setReminder(
        selectedReminder === null
        ? 
        initialReminderState
        : selectedReminder
    );
  }, [showModal]);*/

  /*useEffect(() => { ??? post isntead
    form.setFieldsValue({
      first_name: user.first_name,
      last_name: user.last_name,
      office: user.office.id,
      publisher: user.publisher ? user.publisher.id : "none",
    });
  }, [user]);
  */

  const onCancel = () => { dispatch(closeReminderModal) };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

 

  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            {...register("first", {required: true, maxLength: 30})}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          
          <DateTimePicker
          {...register("time", {required: true})}
          renderInput={(params) => <TextField {...params} />}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
        
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit((data)=> alert(JSON.stringify(data)))}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    </div>
  );
};

export default ModalDialog;
