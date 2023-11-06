import { Container, Grid, TextField, Typography, Button } from "@mui/material";

import { Add as AddIcon, Send as SendIcon } from "@mui/icons-material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";

import * as React from "react";

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

  if (diff >= -5) {
    alert("Setting a meal that's been already confirmed!");
  } else {
    alert("Setting a meal that will need future confirmation!");
  }
}

function FoodEntry({ setHeader, id }) {
  // This is the page for planning a future meal (or meals!)

  // datetime - https://mui.com/x/react-date-pickers/date-time-picker/
  //          - (make sure to show badges for number of meals planned per day - see https://mui.com/x/react-date-pickers/date-calendar/)

  // submit button - https://mui.com/material-ui/react-floating-action-button/
  //               - make sure to show snackbar on success - see https://mui.com/material-ui/react-snackbar/

  // TODO: a page for confirming past meals really happened! (this should be in the notifications page)
  const [name, setName] = React.useState("");

  const [protein, setProtein] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [fat, setFat] = React.useState("");

  const [calories, setCalories] = React.useState("");

  const [datetime, setDatetime] = React.useState(dayjs());

  React.useEffect(() => setHeader("Enter Meal Details"));

  return (
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

        <GridItem>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() =>
              storeMeal(name, protein, carbs, fat, calories, datetime)
            }
          >
            Submit
          </Button>
        </GridItem>
      </OuterGrid>
    </Container>
  );
}

export default FoodEntry;
