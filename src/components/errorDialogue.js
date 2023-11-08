import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

function ErrorDialogue({}) {
  const navigate = useNavigate();

  return (
    <Dialog open={true}>
      <DialogTitle> Sorry! </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">
          You've stumbled upon a part of this application that is not yet built.
          We're sorry for the inconvenience and encourage you to reach out to
          support!
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          endIcon={<HomeIcon />}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialogue;
