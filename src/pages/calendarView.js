import {
  Box,
  Fab,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  FitnessCenter as DumbellIcon,
  Fastfood as FoodIcon,
  Bedtime as BedtimeIcon,
} from "@mui/icons-material";

import PlanningDateCalendar from "../components/planningDateCalendar.js";
import FoodEntryDialogue from "../components/foodEntryDialogue.js";
import WorkoutEntryDialogue from "../pages/workoutEntry.js";
import SleepEntryDialogue from "../pages/sleepEntry.js";

import { ContainerGrid, GridItem } from "../components/gridItems.js";
import {
  MealSummary,
  SleepSummary,
  WorkoutSummary,
} from "../components/daySummary.js";

import * as React from "react";

import dayjs from "dayjs";

function CalendarView({ setHeader }) {
  React.useEffect(() => {
    setHeader("Health Harmony");
  });

  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [plannedMeals, setPlannedMeals] = React.useState([]);
  const [plannedWorkouts, setPlannedWorkouts] = React.useState([]);
  const [plannedSleep, setPlannedSleep] = React.useState([]);

  const [foodEntryOpen, setFoodEntryOpen] = React.useState(false);
  const [workoutEntryOpen, setWorkoutEntryOpen] = React.useState(false);
  const [sleepEntryOpen, setSleepEntryOpen] = React.useState(false);

  const [speedDialOpen, setSpeedDialOpen] = React.useState(false);

  const [refresh, setRefresh] = React.useState(1);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <ContainerGrid sx={{ height: "90vh" }}>
        <GridItem md={4}>
          <PlanningDateCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setPlannedMeals={setPlannedMeals}
            setPlannedWorkouts={setPlannedWorkouts}
            setPlannedSleep={setPlannedSleep}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </GridItem>

        <GridItem margin="8px" md={12}>
          <Typography variant="h4">
            {dayjs(selectedDate).format("dddd, MMMM D")}
          </Typography>
        </GridItem>

        <GridItem margin="8px" md={12}>
          <MealSummary plannedMeals={plannedMeals} setRefresh={setRefresh} />
        </GridItem>

        <GridItem margin="8px" md={12}>
          <WorkoutSummary
            plannedWorkouts={plannedWorkouts}
            setRefresh={setRefresh}
          />
        </GridItem>

        <GridItem margin="8px" md={12}>
          <SleepSummary plannedSleep={plannedSleep} setRefresh={setRefresh} />
        </GridItem>
      </ContainerGrid>

      <FoodEntryDialogue
        open={foodEntryOpen}
        setOpen={setFoodEntryOpen}
        date={selectedDate}
        setRefresh={setRefresh}
      />

      <WorkoutEntryDialogue
        open={workoutEntryOpen}
        setOpen={setWorkoutEntryOpen}
        date={selectedDate}
        setRefresh={setRefresh}
      />

      <SleepEntryDialogue
        open={sleepEntryOpen}
        setOpen={setSleepEntryOpen}
        setRefresh={setRefresh}
      />

      <SpeedDial
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        ariaLabel="Plan / Record"
        open={speedDialOpen}
        onClick={(event) => setSpeedDialOpen(true)}
        onFocus={(event) => setSpeedDialOpen(true)}
        onMouseEnter={(event) => setSpeedDialOpen(true)}
        onClose={(event) => setSpeedDialOpen(false)}
      >
        <SpeedDialAction
          key="meal"
          icon={<FoodIcon />}
          tooltipTitle="Plan or Record Meal"
          onClick={() => setFoodEntryOpen(true)}
        />

        <SpeedDialAction
          key="workout"
          icon={<DumbellIcon />}
          tooltipTitle="Plan or Record Workout"
          onClick={() => setWorkoutEntryOpen(true)}
        />

        <SpeedDialAction
          key="sleep"
          icon={<BedtimeIcon />}
          onClick={() => setSleepEntryOpen(true)}
          tooltipTitle="Plan or Record Sleep"
        />
      </SpeedDial>
    </Box>
  );
}

export default CalendarView;
