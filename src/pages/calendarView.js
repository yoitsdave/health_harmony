import {
  Box,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
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

import { ContainerGrid, GridItem } from "../components/gridItems.js";
import { MealSummary, WorkoutSummary } from "../components/daySummary.js";

import * as React from "react";

import dayjs from "dayjs";

function CalendarView({ setHeader }) {
  React.useEffect(() => {
    setHeader("Health Harmony");
  });

  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [plannedMeals, setPlannedMeals] = React.useState([]);
  const [plannedWorkouts, setPlannedWorkouts] = React.useState([]);

  const [foodEntryOpen, setFoodEntryOpen] = React.useState(false);
  const [workoutEntryOpen, setWorkoutEntryOpen] = React.useState(false);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <ContainerGrid sx={{ height: "90vh" }}>
        <GridItem md={4}>
          <PlanningDateCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setPlannedMeals={setPlannedMeals}
            setPlannedWorkouts={setPlannedWorkouts}
          />
        </GridItem>

        <GridItem margin="8px" md={12}>
          <MealSummary plannedMeals={plannedMeals} />
        </GridItem>

        <GridItem margin="8px" md={12}>
          <WorkoutSummary plannedWorkouts={plannedWorkouts} />
        </GridItem>
      </ContainerGrid>

      <FoodEntryDialogue
        open={foodEntryOpen}
        setOpen={setFoodEntryOpen}
        date={selectedDate}
      />

      <SpeedDial
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        ariaLabel="Plan / Record"
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
          onClick={() => alert("record workout not supported :(")}
          tooltipTitle="Plan or Record Workout"
        />

        <SpeedDialAction
          key="sleep"
          icon={<BedtimeIcon />}
          onClick={() => alert("record sleep not supported :(")}
          tooltipTitle="Plan or Record Sleep"
        />
      </SpeedDial>
    </Box>
  );
}

export default CalendarView;
