import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";

import { Delete as DeleteIcon, Check as CheckIcon } from "@mui/icons-material";

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import TimerIcon from "@mui/icons-material/Timer";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import RedirectDialogue from "../components/redirectDialogue.js";

import { ContainerGrid, GridItem } from "../components/gridItems.js";

import dayjs from "dayjs";

function deleteMeal(id, set) {
  const newMeals = JSON.parse(localStorage.getItem("meals")).filter((meal) => {
    return meal.id != id;
  });
  localStorage.setItem("meals", JSON.stringify(newMeals));

  const tempPendingMeals = newMeals.filter((meal) => {
    return meal.confirmed == false;
  });
  set(tempPendingMeals);
}

function deleteWorkout(id, set) {
  const newWorkouts = JSON.parse(localStorage.getItem("workouts")).filter(
    (workout) => {
      return workout.id != id;
    }
  );
  localStorage.setItem("workouts", JSON.stringify(newWorkouts));

  const tempPendingWorkouts = newWorkouts.filter((meal) => {
    return meal.confirmed == false;
  });
  set(tempPendingWorkouts);
}

function deleteSleep(id, set) {
  const newSleeps = JSON.parse(localStorage.getItem("sleeps")).filter(
    (sleep) => {
      return sleep.id != id;
    }
  );
  localStorage.setItem("sleeps", JSON.stringify(newSleeps));

  const tempSleeps = newSleeps.filter((meal) => {
    return meal.confirmed == false;
  });
  set(tempSleeps);
}

function confirmMeal(id, set) {
  let oldMeals = JSON.parse(localStorage.getItem("meals")).filter((meal) => {
    return meal.id != id;
  });

  let newMeal = JSON.parse(localStorage.getItem("meals")).filter((meal) => {
    return meal.id == id;
  })[0];

  newMeal["confirmed"] = true;

  console.log(JSON.stringify(oldMeals.concat([newMeal])));

  localStorage.setItem("meals", JSON.stringify(oldMeals.concat([newMeal])));

  const tempPendingMeals = oldMeals.concat([newMeal]).filter((meal) => {
    return meal.confirmed == false;
  });
  set(tempPendingMeals);
}

function confirmWorkout(id, set) {
  let oldWorkouts = JSON.parse(localStorage.getItem("workouts")).filter(
    (workout) => {
      return workout.id != id;
    }
  );

  let newWorkout = JSON.parse(localStorage.getItem("workouts")).filter(
    (workout) => {
      return workout.id == id;
    }
  )[0];

  newWorkout.confirmed = true;

  localStorage.setItem(
    "workouts",
    JSON.stringify(oldWorkouts.concat([newWorkout]))
  );

  const tempPendingWorkouts = oldWorkouts
    .concat([newWorkout])
    .filter((workout) => {
      return workout.confirmed == false;
    });
  set(tempPendingWorkouts);
}

function confirmSleep(id, set) {
  let oldSleeps = JSON.parse(localStorage.getItem("sleeps")).filter((sleep) => {
    return sleep.id != id;
  });

  let newSleep = JSON.parse(localStorage.getItem("sleeps")).filter((sleep) => {
    return sleep.id == id;
  })[0];

  newSleep.confirmed = true;

  localStorage.setItem("sleeps", JSON.stringify(oldSleeps.concat([newSleep])));

  const tempPendingSleeps = oldSleeps.concat([newSleep]).filter((sleep) => {
    return sleep.confirmed == false;
  });
  set(tempPendingSleeps);
}

function MealNotificationCard({ meal, set }) {
  return (
    <Card variant="outlined" key={meal.id}>
      <CardContent>
        <Typography gutterBottom>
          {meal.name} on {dayjs(meal.datetime).format("dddd, MMMM D")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Did you eat this meal as planned at{" "}
          {dayjs(meal.datetime).format("h:mm a")}?
        </Typography>
      </CardContent>

      <CardActions>
        {/* <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={() => deleteMeal(meal.id, set)}
        >
          Delete
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          endIcon={<CheckIcon />}
          onClick={() => confirmMeal(meal.id, set)}
        >
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
}

function WorkoutNotificationCard({ workout, set }) {
  return (
    <Card variant="outlined" key={workout.id}>
      <CardContent>
        <Typography gutterBottom>
          {workout.exerciseType} on{" "}
          {dayjs(workout.datetime).format("dddd, MMMM D")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Did you complete this workout as planned at{" "}
          {dayjs(workout.datetime).format("h:mm a")}?
        </Typography>
      </CardContent>

      <CardActions>
        {/* <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={() => deleteWorkout(workout.id, set)}
        >
          Cancel
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          endIcon={<CheckIcon />}
          onClick={() => confirmWorkout(workout.id, set)}
        >
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
}

function SleepNotificationCard({ sleep, set }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom>
          Sleep on {dayjs(sleep.start).format("dddd, MMMM D")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Did you sleep as planned from {dayjs(sleep.start).format("h:mm a")} to{" "}
          {dayjs(sleep.end).format("h:mm a")}?
        </Typography>
      </CardContent>

      <CardActions>
        {/* <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={() => deleteSleep(sleep.id, set)}
        >
          Cancel
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          endIcon={<CheckIcon />}
          onClick={() => confirmSleep(sleep.id, set)}
        >
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
}

export default function MenuAppBar({ children, page }) {
  const [menuShown, setMenuShown] = React.useState(false);
  const [notifsShown, setNotifsShown] = React.useState(false);

  const [pendingMeals, setPendingMeals] = React.useState([]);
  const [pendingWorkouts, setPendingWorkouts] = React.useState([]);
  const [pendingSleeps, setPendingSleeps] = React.useState([]);

  const [numPending, setNumPending] = React.useState(0);

  const [redirectOpen, setRedirectOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (
      localStorage.getItem("name") === null &&
      location.pathname != "/personaldataentry"
    ) {
      setRedirectOpen(true);
    } else if (location.pathname == "/personaldataentry") {
      setRedirectOpen(false);
    }

    let tempMeals = localStorage.getItem("meals");
    let tempWorkouts = localStorage.getItem("workouts");
    let tempSleeps = localStorage.getItem("sleeps");

    if (tempMeals == null || tempMeals == "") {
      localStorage.setItem("meals", JSON.stringify([]));
    }
    if (tempWorkouts == null || tempWorkouts == "") {
      localStorage.setItem("workouts", JSON.stringify([]));
    }
    if (tempSleeps == null || tempSleeps == "") {
      localStorage.setItem("sleeps", JSON.stringify([]));
    }

    const meals = JSON.parse(localStorage.getItem("meals"));
    const workouts = JSON.parse(localStorage.getItem("workouts"));
    const sleeps = JSON.parse(localStorage.getItem("sleeps"));

    const tempPendingMeals = meals.filter((meal) => {
      return meal.confirmed == false;
    });
    const tempPendingWorkouts = workouts.filter((workout) => {
      return workout.confirmed == false;
    });
    const tempPendingSleeps = sleeps.filter((sleep) => {
      return sleep.confirmed == false;
    });
    setPendingMeals(tempPendingMeals);
    setPendingWorkouts(tempPendingWorkouts);
    setPendingSleeps(tempPendingSleeps);

    setNumPending(
      tempPendingMeals.length +
        tempPendingSleeps.length +
        tempPendingWorkouts.length
    );
  }, [
    redirectOpen,
    notifsShown,
    menuShown,
    location.pathname,
    localStorage.getItem("meals"),
    localStorage.getItem("workouts"),
    localStorage.getItem("sleeps"),
  ]);

  const handleMenu = (event) => {
    event.preventDefault();
    setMenuShown(true);
  };

  const handleNotifs = (event) => {
    event.preventDefault();
    setNotifsShown(true);
  };

  const handleClose = () => {
    setMenuShown(false);
    setNotifsShown(false);
  };

  const handleLink = (page) => {
    return (event) => {
      event.preventDefault();
      navigate(page);
      handleClose();
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <RedirectDialogue open={redirectOpen} setOpen={setRedirectOpen} />

      <AppBar position="static" style={{ margin: 0 }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor={"left"} open={menuShown} onClose={handleClose}>
            <List>
              <ListItem key="homepage" disablePadding>
                <ListItemButton onClick={handleLink("")}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem key="personaldataentry" disablePadding>
                <ListItemButton onClick={handleLink("personaldataentry")}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Personal Info" />
                </ListItemButton>
              </ListItem>
              <ListItem key="suggested" disablePadding>
                <ListItemButton onClick={handleLink("suggested")}>
                  <ListItemIcon>
                    <AutoFixHighIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exercise Suggestions" />
                </ListItemButton>
              </ListItem>
              <ListItem key="stopwatch" disablePadding>
                <ListItemButton onClick={handleLink("stopwatch")}>
                  <ListItemIcon>
                    <TimerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stopwatch" />
                </ListItemButton>
              </ListItem>
              <ListItem key="summaryplot" disablePadding>
                <ListItemButton onClick={handleLink("summaryplot")}>
                  <ListItemIcon>
                    <AutoGraphIcon />
                  </ListItemIcon>
                  <ListItemText primary="Summary Plots" />
                </ListItemButton>
              </ListItem>
              <ListItem key="reset" disablePadding>
                <ListItemButton onClick={handleLink("reset")}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {page}
          </Typography>

          <Badge
            badgeContent={numPending}
            color="error"
            variant="dot"
            overlap="circular"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleNotifs}
            >
              <InboxIcon />
            </IconButton>
          </Badge>

          <Drawer anchor={"right"} open={notifsShown} onClose={handleClose}>
            <Typography
              variant="h6"
              component="div"
              sx={{ width: "80vw" }}
            ></Typography>

            <ContainerGrid>
              {pendingMeals.map((meal) => {
                return (
                  <GridItem md={8} margin="8px" key={meal.id}>
                    <MealNotificationCard meal={meal} set={setPendingMeals} />
                  </GridItem>
                );
              })}
              {pendingWorkouts.map((workout) => {
                return (
                  <GridItem md={8} margin="8px" key={workout.id}>
                    <WorkoutNotificationCard
                      workout={workout}
                      set={setPendingWorkouts}
                    />
                  </GridItem>
                );
              })}
              {pendingSleeps.map((sleep) => {
                return (
                  <GridItem md={8} margin="8px" key={sleep.id}>
                    <SleepNotificationCard
                      sleep={sleep}
                      set={setPendingSleeps}
                    />
                  </GridItem>
                );
              })}
            </ContainerGrid>
          </Drawer>
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
}
