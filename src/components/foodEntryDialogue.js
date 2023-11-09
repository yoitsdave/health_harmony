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

import dayjs from "dayjs";

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

function storeMeal(name, protein, carbs, fat, calories, datetime) {
  const now = dayjs();
  const scheduled = dayjs(datetime);
  const diff = now.diff(scheduled, "minute");
  let confirmed = false;

  if (diff >= -1) {
    confirmed = true;
  }
  let meals = localStorage.getItem("meals");

  if (meals == null || meals == "") {
    localStorage.setItem("meals", JSON.stringify([]));
  }
  meals = JSON.parse(localStorage.getItem("meals"));

  const newMeal = {
    id: meals.length,
    name: name,
    protein: protein,
    carbs: carbs,
    fat: fat,
    calories: calories,
    datetime: datetime,
    confirmed: confirmed,
  };

  localStorage.setItem("meals", JSON.stringify(meals.concat([newMeal])));
}

function FoodEntryDialogue({ open, setOpen, date, setRefresh }) {
  const [name, setName] = React.useState("");

  const [protein, setProtein] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [fat, setFat] = React.useState("");

  const [calories, setCalories] = React.useState("");

  const [datetime, setDatetime] = React.useState(date);

  return (
    <Dialog open={open}>
      <DialogTitle> Add Meal </DialogTitle>

      <DialogContent>
        <Container maxWidth="xs">
          <OuterGrid>
            <GridItem>
              <ControlledTextField
                value={name}
                setValue={setName}
                label="Meal Label"
              />
            </GridItem>

            <InnerGrid>
              <GridItem>
                <ControlledTextField
                  value={protein}
                  setValue={setProtein}
                  label="Protein (Grams)"
                />
              </GridItem>

              <GridItem>
                <ControlledTextField
                  value={carbs}
                  setValue={setCarbs}
                  label="Carbs (Grams)"
                />
              </GridItem>

              <GridItem>
                <ControlledTextField
                  value={fat}
                  setValue={setFat}
                  label="Fat (Grams)"
                />
              </GridItem>
            </InnerGrid>

            <GridItem>
              <ControlledTextField
                value={calories}
                setValue={setCalories}
                label="Calories"
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
            storeMeal(name, protein, carbs, fat, calories, datetime);
            setOpen(false);
            setRefresh(1);
          }}
        >
          Add Meal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FoodEntryDialogue;
