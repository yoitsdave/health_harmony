import { Typography, Button, Grid } from "@mui/material";
import { ContainerGrid, GridItem } from "../components/gridItems.js";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { Delete as DeleteIcon } from "@mui/icons-material";

import dayjs from "dayjs";

function deleteMeal(id, setRefresh) {
  const newMeals = JSON.parse(localStorage.getItem("meals")).filter((meal) => {
    return meal.id != id;
  });
  localStorage.setItem("meals", JSON.stringify(newMeals));

  setRefresh(1);
}

function deleteWorkout(id, setRefresh) {
  const newWorkouts = JSON.parse(localStorage.getItem("workouts")).filter(
    (workout) => {
      return workout.id != id;
    }
  );
  localStorage.setItem("workouts", JSON.stringify(newWorkouts));

  setRefresh(1);
}

function deleteSleep(id, setRefresh) {
  const newSleeps = JSON.parse(localStorage.getItem("sleeps")).filter(
    (sleep) => {
      return sleep.id != id;
    }
  );
  localStorage.setItem("sleeps", JSON.stringify(newSleeps));

  setRefresh(1);
}

function MealSummary({ plannedMeals, setRefresh }) {
  return (
    <ContainerGrid>
      <GridItem>
        <Typography variant="h5"> Meals </Typography>
      </GridItem>

      {plannedMeals.length > 0 ? (
        plannedMeals.map((meal) => {
          return (
            <GridItem md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom>{meal.name}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {dayjs(meal.datetime).format("hh:mm a")}
                  </Typography>
                  <Typography variant="body2">
                    Calories: {meal.calories} <br />
                    Protein: {meal.protein} <br />
                    Carbs: {meal.carbs} <br />
                    Fat: {meal.fat} <br />
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={() => deleteMeal(meal.id, setRefresh)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          );
        })
      ) : (
        <GridItem>
          <Typography> No planned meals </Typography>
        </GridItem>
      )}
    </ContainerGrid>
  );
}

function WorkoutSummary({ plannedWorkouts, setRefresh }) {
  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);

  return (
    <ContainerGrid>
      <GridItem>
        <Typography variant="h5"> Workouts </Typography>
      </GridItem>

      {plannedWorkouts.length > 0 ? (
        plannedWorkouts.map((workout) => {
          return (
            <GridItem md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom>{workout.exerciseType}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {dayjs(workout.datetime).format("hh:mm a")}
                  </Typography>
                  <Typography variant="body2">
                    {"Duration: "}
                    {dayjs
                      .duration(workout.durationMinutes, "minutes")
                      .format("H:mm")}
                    <br />
                    Intensity: {workout.intensity} <br />
                    Notes: {workout.notes} <br />
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={() => deleteWorkout(workout.id, setRefresh)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          );
        })
      ) : (
        <GridItem>
          <Typography> No planned workouts </Typography>
        </GridItem>
      )}
    </ContainerGrid>
  );
}

function SleepSummary({ plannedSleep, setRefresh }) {
  return (
    <ContainerGrid>
      <GridItem>
        <Typography variant="h5"> Sleep </Typography>
      </GridItem>

      {plannedSleep.length > 0 ? (
        plannedSleep.map((sleep) => {
          return (
            <GridItem md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom>
                    Slept for{" "}
                    {dayjs(sleep.end).diff(dayjs(sleep.start), "hours")}:
                    {dayjs(sleep.end).diff(dayjs(sleep.start), "minutes") -
                      60 * dayjs(sleep.end).diff(dayjs(sleep.start), "hours")}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Quality: {sleep.quality}
                  </Typography>
                  <Typography variant="body2">
                    Start: {dayjs(sleep.start).format("h:m a")}
                    <br />
                    End: {dayjs(sleep.end).format("h:m a")}
                    <br />
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={() => deleteSleep(sleep.id, setRefresh)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          );
        })
      ) : (
        <GridItem>
          <Typography> No planned sleep </Typography>
        </GridItem>
      )}
    </ContainerGrid>
  );
}

export { MealSummary, WorkoutSummary, SleepSummary };
