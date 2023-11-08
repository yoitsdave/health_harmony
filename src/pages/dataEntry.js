import {
  MenuItem,
  TextField,
  Button,
  Box,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Container, Grid, Fab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Add as AddIcon } from "@mui/icons-material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

function GridItem({ children }) {
  return (
    <Grid item sm={12}>
      {children}
    </Grid>
  );
}

function onSubmit() {
  return <div></div>;
}

function OuterGrid({ children }) {
  return (
    <Grid
      container
      spacing={3.5}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      {children}
    </Grid>
  );
}

function InnerGrid({ children }) {
  return (
    <Grid
      item
      container
      sm={12}
      spacing={1}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      {children}
    </Grid>
  );
}

function ControlledTextField({ value, setValue, label }) {
  return (
    <TextField
      autoComplete="on"
      fullWidth
      id={label}
      aria-label={label}
      label={label}
      variant="outlined"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}
function ControlledNumberField({ value, setValue, label }) {
  return (
    <TextField
      autoComplete="on"
      fullWidth
      id={label}
      aria-label={label}
      label={label}
      type="number"
      variant="outlined"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}

function storeInfo(name, age, inches, feet, weight, sex) {
  const message =
    "Name: " +
    name +
    "\nAge : " +
    age +
    "\nHeight: " +
    feet +
    "'" +
    inches +
    "\nSex: Male\n" +
    "Weight: " +
    weight;

  if (window.confirm(message) == true) {
    window.location.reload();
    return <Alert severity="success">This is a success message!</Alert>;
  }
}

function DataEntry({ setHeader }) {
  const [open, setOpen] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("feet", feet);
    localStorage.setItem("inches", inches);
    localStorage.setItem("weight", weight);
    localStorage.setItem("sex", sex);

    setOpen(false);

    // Delay showing the alert after the page is reloaded
    setTimeout(() => {
      setShowSuccessAlert(true);
    }, 1000);
    console.log(localStorage.getItem("name"));

    navigate("/");
  };





  const [name, setName] =  React.useState(localStorage.getItem('name')|| "");


  const [age, setAge] = React.useState(localStorage.getItem('age') || "");
  const [inches, setInches] = React.useState(localStorage.getItem('inches') || "");
  const [feet, setFeet] = React.useState(localStorage.getItem('feet') || "");
  const [weight, setWeight] = React.useState(localStorage.getItem('weight') ||"");



  const [sex, setSex] = React.useState(localStorage.getItem('sex') || "");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  console.log(localStorage.getItem("age"));

  React.useEffect(() => setHeader("Enter User Information"));

  return (
    <center>
      <Container maxWidth="xs">
        <Toolbar />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <OuterGrid>
            <GridItem>
              <ControlledTextField
                value={name}
                setValue={setName}
                label="Name"
              />
            </GridItem>

            <GridItem>
              <ControlledNumberField
                value={age}
                setValue={setAge}
                label="Age (Years)"
                type="number"
              />
            </GridItem>

            <InnerGrid>
              <GridItem>
                <ControlledNumberField
                  value={feet}
                  setValue={setFeet}
                  label="Height (Feet)"
                />
              </GridItem>

              <GridItem>
                <ControlledNumberField
                  value={inches}
                  setValue={setInches}
                  label="Height (Inches)"
                />
              </GridItem>
            </InnerGrid>

            <GridItem>
              <ControlledNumberField
                value={weight}
                setValue={setWeight}
                label="Weight (Pounds)"
              />
            </GridItem>

            <GridItem>
              <FormControl fullWidth>
                <InputLabel htmlFor="sex-select">Sex</InputLabel>
                <Select
                  label="Sex"
                  value={sex}
                  onChange={handleSexChange}
                  inputProps={{
                    name: "sex",
                    id: "sex-select",
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <center>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Is this correct?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Name: {name}
                      <br />
                      Age: {age}
                      <br />
                      Height: {feet}'{inches}
                      <br />
                      Weight: {weight}
                      <br />
                      Sex: {sex}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>DISAGREE</Button>
                    <Button onClick={handleAgree} autoFocus>
                      AGREE
                    </Button>
                  </DialogActions>
                </Dialog>
              </center>
            </GridItem>
            <GridItem>
              {showSuccessAlert && (
                <Slide direction="left" in={showSuccessAlert}>
                  <Stack sx={{ width: "100%" }} spacing={1}>
                    <Alert
                      severity="success"
                      variant="filled"
                      onClose={() => setShowSuccessAlert(false)}
                    >
                      <AlertTitle>
                        <strong>Congrats! Your info has been saved!</strong>
                      </AlertTitle>
                    </Alert>
                  </Stack>
                </Slide>
              )}
            </GridItem>
          </OuterGrid>
        </LocalizationProvider>
      </Container>
    </center>
  );
}

export default DataEntry;
