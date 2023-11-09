// ... (your existing imports)
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";

import { Add as AddIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { BarChart } from '@mui/x-charts/BarChart';

import dayjs from "dayjs";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";

function GridItem({ children }) {
  return (
    <Grid item sm={12}>
      {children}
    </Grid>
  )}

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
  )}

function VisualSummary({ setHeader }) {
  var value = localStorage.getItem("meals");
  var proper = value ? JSON.parse(value) : null; // Check if value is null

  // Check if 'proper' is not null and has the expected structure
  var carbs = proper && proper[0] ? proper[0]["carbs"] : null;
  var calories = proper && proper[0] ? proper[0]["calories"] : null;
  var fat = proper && proper[0] ? proper[0]["fat"] : null;
  var protein = proper && proper[0] ? proper[0]["protein"] : null;

  var workout = JSON.parse(localStorage.getItem("workouts"));
  var sleep = JSON.parse(localStorage.getItem("sleeps"));
  var workoutintensity = workout[0] ? workout[0]["intensity"] : null;
  var workoutduration = workout[0] ? workout[0]["durationHours"] : null;

  var sleepquality = sleep[0] ? sleep[0]["quality"] : null;

  console.log("valuess" + workout)
  React.useEffect(() => setHeader("Summary Plots"));
  const [category, setCategory] = React.useState("Macro Stats of most recent meal");
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleCancel = () => {
    setPopupOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Toolbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InnerGrid>
          <GridItem>
            <Typography variant="h6">Category</Typography>
            <Select
              fullWidth
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="Macro Stats of most recent meal">Macro Stats of most recent meal</MenuItem>
              <MenuItem value="Most recent Sleep Quality vs Workout Intensity">Most recent Sleep Quality vs Workout Intensity</MenuItem>
              <MenuItem value="Most recent Workout Duration vs Workout Intensity">Most recent Workout Duration vs Workout Intensity</MenuItem>
              <MenuItem value="Most recent Calories intake vs Sleep Quality">Most recent Calories intake vs Sleep Quality</MenuItem>

            </Select>
          </GridItem>

          <GridItem>
          </GridItem>
          <GridItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePopupOpen}
            >
              Submit
            </Button>
          </GridItem>
        </InnerGrid>
      </LocalizationProvider>
      <Dialog open={isPopupOpen} onClose={handlePopupClose}>
        <DialogTitle>Selected Options</DialogTitle>
        <DialogContent>
          {category === "Macro Stats of most recent meal" && (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Calories', 'Protien', 'Carbs','Fat'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [calories,protein, carbs,fat],
                },
              ]}
              width={500}
              height={300}
            />
          )}
          {category === "Most recent Sleep Quality vs Workout Intensity" && (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Sleep Quality', 'Work out Intensity'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [sleepquality, workoutintensity],
                },
              ]}
              width={500}
              height={300}
            />
          )}

          {category === "Most recent Workout Duration vs Workout Intensity" && (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Workout Duration(Hr)', 'Workout Intensity'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [workoutduration, workoutintensity],
                },
              ]}
              width={500}
              height={300}
            />
          )}
                    {category === "Most recent Calories intake vs Sleep Quality" && (
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Calories Intake', 'Sleep Quality'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [calories, sleepquality],
                },
              ]}
              width={500}
              height={300}
            />
          )}
          <p>Category: {category}</p>

          {/* Use a "Cancel" button with the same style as the "SleepEntry" component */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancel}
            endIcon={<CancelIcon />}
            style={{ marginLeft: 400 }} 
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default VisualSummary;
