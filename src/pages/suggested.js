import * as React from "react";

import ErrorDialogue from "../components/errorDialogue.js";
import { ContainerGrid, GridItem } from "../components/gridItems.js";
import {
  Toolbar,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
} from "@mui/material";

import { Delete as DeleteIcon, Check as CheckIcon } from "@mui/icons-material";

import dayjs from "dayjs";

function WorkoutCard({
  type,
  durationMinutes,
  intensity,
  deleteKey,
  suggested,
  setSuggested,
}) {
  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);

  function deleteSuggested(innerKey) {
    setSuggested(
      suggested.filter((workout) => {
        return workout.key != innerKey;
      })
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom> {type} </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {"Duration: "}
          {dayjs.duration(durationMinutes, "minutes").format("H:mm")}
          <br />
        </Typography>
        <Typography variant="body2">Intensity: {intensity} </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={() => deleteSuggested(deleteKey)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<CheckIcon />}
          onClick={() => {
            let workouts = localStorage.getItem("workouts");

            if (workouts == null || workouts == "") {
              localStorage.setItem("workouts", JSON.stringify([]));
            }
            workouts = JSON.parse(localStorage.getItem("workouts"));

            const newWorkout = {
              id: workouts.length,
              durationMinutes: durationMinutes,
              durationHours: 0,
              exerciseType: type,
              intensity: intensity,
              notes: "Suggested workout",
              datetime: dayjs(),
            };
            localStorage.setItem(
              "workouts",
              JSON.stringify(workouts.concat([newWorkout]))
            );

            deleteSuggested(deleteKey);
          }}
        >
          Accept
        </Button>
      </CardActions>
    </Card>
  );
}

function Suggested({ setHeader }) {
  React.useEffect(() => {
    setHeader("Suggested Exercises");
  });

  const [suggested, setSuggested] = React.useState([
    { type: "HIIT", durationMinutes: 90, intensity: 4, key: 0 },
    { type: "Walk", durationMinutes: 90, intensity: 4, key: 1 },
    { type: "Run", durationMinutes: 90, intensity: 4, key: 2 },
    { type: "Cycling", durationMinutes: 90, intensity: 4, key: 3 },
    { type: "Dance", durationMinutes: 90, intensity: 4, key: 4 },
    { type: "Pilates", durationMinutes: 90, intensity: 4, key: 5 },
  ]);

  return (
    // <Box sx={{ height: "90vh", width: "90vw", overflow: "auto" }}>
    <ContainerGrid>
      <GridItem margin="8px" md={12}>
        <Typography variant="h5">Today's Suggestions</Typography>
      </GridItem>

      <GridItem md={8} margin="8px">
        {suggested.map((workout) => {
          return (
            <WorkoutCard
              type={workout.type}
              durationMinutes={workout.durationMinutes}
              intensity={workout.intensity}
              deleteKey={workout.key}
              key={workout.key}
              suggested={suggested}
              setSuggested={setSuggested}
            />
          );
        })}
      </GridItem>
    </ContainerGrid>
    // </Box>
  );
}

export default Suggested;
