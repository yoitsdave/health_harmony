import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Send as SendIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";

function WorkoutEntry({ open, setOpen, date, setRefresh }) {
  const exerciseTypes = [
    "Walk",
    "Run",
    "Cycling",
    "Elliptical",
    "Rower",
    "Stair Stepper",
    "HIIT",
    "Hiking",
    "Yoga",
    "Functional Strength Training",
    "Dance",
    "Cooldown",
    "Core Training",
    "Pilates",
    "Tai Chi",
    "Swimming",
    "Wheelchair",
    "Multisport",
    "Kickboxing",
  ];

  function GridItem({ children }) {
    return (
      <Grid item sm={12}>
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

  function OuterGrid({ children }) {
    return (
      <Grid
        container
        spacing={3}
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

  function storeWorkout(
    durationHours,
    durationMinutes,
    exerciseType,
    intensity,
    notes,
    datetime
  ) {
    const now = dayjs();
    const scheduled = dayjs(datetime);
    const diff = now.diff(scheduled, "minute");

    let workouts = localStorage.getItem("workouts");

    if (workouts == null || workouts == "") {
      localStorage.setItem("meals", JSON.stringify([]));
    }
    workouts = JSON.parse(localStorage.getItem("workouts"));

    const newWorkout = {
      id: workouts.length,
      durationHours: durationHours,
      durationMinutes: durationMinutes,
      exerciseType: exerciseType,
      intensity: intensity,
      notes: notes,
      datetime: datetime,
    };

    localStorage.setItem(
      "workouts",
      JSON.stringify(workouts.concat([newWorkout]))
    );
  }

  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [notes, setNotes] = useState("");
  const [datetime, setDatetime] = React.useState(date);

  return (
    <Dialog open={open}>
      <DialogTitle> Add Workout </DialogTitle>
      <DialogContent style={{paddingTop:"20px"}}>
        <Container maxWidth="xs">
          <OuterGrid>
            <GridItem>
              <ControlledTextField
                value={durationHours}
                setValue={setDurationHours}
                label="Duration (Hours)"
              />
            </GridItem>

            <InnerGrid>
              <GridItem>
                <ControlledTextField
                  value={durationMinutes}
                  setValue={setDurationMinutes}
                  label="Duration (Minutes)"
                />
              </GridItem>

              <GridItem>
                <FormControl fullWidth>
                  <InputLabel id="exercise-type-label">
                    Exercise Type
                  </InputLabel>
                  <Select
                    labelId="exercise-type-label"
                    id="exercise-type"
                    value={exerciseType}
                    label="Exercise Type"
                    onChange={(e) => setExerciseType(e.target.value)}
                  >
                    {exerciseTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            </InnerGrid>

            <GridItem>
              <ControlledTextField
                value={intensity}
                setValue={setIntensity}
                label="Intensity (1-10)"
              />
            </GridItem>

            <GridItem>
              <TextField
                fullWidth
                label="Notes"
                value={notes}
                setValue={setNotes}
                multiline
                rows={4}
                placeholder={"Write down a small reflection of your workout"}
                onChange={(e) => setNotes(e.target.value)}
              />
            </GridItem>

            <GridItem>
              <DateTimePicker
                label="Time"
                value={datetime}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                onChange={(newValue) => setDatetime(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </GridItem>
          </OuterGrid>
        </Container>
      </DialogContent>

    <DialogActions>
      <Button
        variant="contained"
        endIcon={<CancelIcon />}
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => {
          storeWorkout(durationHours, durationMinutes, exerciseType, intensity, notes, datetime);
          setOpen(false);
        }}
      >
        Add Workout
      </Button>
    </DialogActions>
  </Dialog>
);
}

export default WorkoutEntry;
