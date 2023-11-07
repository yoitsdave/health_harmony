import { Typography, Button, Grid } from "@mui/material";
import { ContainerGrid, GridItem } from "../components/gridItems.js";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { Edit as EditIcon } from "@mui/icons-material";

import dayjs from "dayjs";

function MealSummary({ plannedMeals }) {
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
                    endIcon={<EditIcon />}
                    onClick={() => alert("edit not supported :(")}
                  >
                    Edit
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

function WorkoutSummary({ plannedWorkouts }) {
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
                  <Typography gutterBottom>{workout.name}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {workout.datetime.format("hh:mm a")}
                  </Typography>
                  <Typography variant="body2">
                    Calories: {workout.calories} <br />
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => alert("edit is currently not supported :(")}
                  >
                    Edit
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

export { MealSummary, WorkoutSummary };
