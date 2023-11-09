import * as React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Send as SendIcon, Cancel as CancelIcon } from "@mui/icons-material";

import {
  Dialog,
  Grid,
  TextField,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

function FoodEntryDialogue({ open, setOpen, date }) {
  const navigate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogTitle> Welcome! </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">
          Welcome to Health Harmony! We need some data from you to get started
          on your health journey. Don't worry - this isn't shared with any
          advertisers. As a matter of fact, it isn't even shared with us!
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            navigate("/personaldataentry");
          }}
        >
          Enter Data
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FoodEntryDialogue;
