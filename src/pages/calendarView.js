import { Box, Fab, List } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import PlanningDateCalendar from "../components/planningDateCalendar.js";
import FoodEntryDialogue from "../components/foodEntryDialogue.js";

import { ContainerGrid, GridItem } from "../components/gridItems.js";
import { MealSummary, WorkoutSummary } from "../components/daySummary.js";

import * as React from "react";

import dayjs from "dayjs";

function CalendarView({ setHeader }) {
  React.useEffect(() => setHeader("Calendar View"));

  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [plannedMeals, setPlannedMeals] = React.useState([]);
  const [plannedWorkouts, setPlannedWorkouts] = React.useState([]);

  const [foodEntryOpen, setFoodEntryOpen] = React.useState(false);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }} disableGutters>
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

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={() => setFoodEntryOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default CalendarView;
