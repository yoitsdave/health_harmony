import { Popover, Badge, Box, Paper } from "@mui/material";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

import * as React from "react";

import dayjs from "dayjs";

function ServerDay({
  foodHighlightedDays,
  workoutHighlightedDays,
  outsideCurrentMonth,
  day,
  meals,
  workouts,
  setPlannedMeals,
  setPlannedWorkouts,
  ...other
}) {
  const dayOfMeals = meals.filter((meal) => {
    return (
      dayjs(meal.datetime).date() == day.date() &&
      dayjs(meal.datetime).month() == day.month()
    );
  });
  const dayOfWorkouts = workouts.filter((workout) => {
    return (
      dayjs(workout.datetime).date() == day.date() &&
      dayjs(workout.datetime).month() == day.month()
    );
  });

  let numPlans = dayOfMeals.length + dayOfWorkouts.length;
  if (outsideCurrentMonth) {
    numPlans = 0;
  }

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={numPlans}
      color="primary"
      variant="dot"
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        onClick={(event) => {
          setPlannedMeals(dayOfMeals);
          setPlannedWorkouts(dayOfWorkouts);
        }}
      />
    </Badge>
  );
}

function PlanningDateCalendar({
  selectedDate,
  setSelectedDate,
  setPlannedMeals,
  setPlannedWorkouts,
  setPlannedSleep,
  refresh,
  setRefresh,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [foodHighlightedDays, setFoodHighlightedDays] = React.useState([]);
  const [workoutHighlightedDays, setWorkoutHighlightedDays] = React.useState(
    []
  );
  const [sleepHighlightedDays, setSleepHighlightedDays] = React.useState([]);

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

  React.useEffect(() => {
    if (refresh == 1) {
      const todayMeals = meals.filter((meal) => {
        return (
          dayjs(meal.datetime).date() == dayjs().date() &&
          dayjs(meal.datetime).month() == dayjs().month()
        );
      });
      const todayWorkouts = workouts.filter((workout) => {
        return (
          dayjs(workout.datetime).date() == dayjs().date() &&
          dayjs(workout.datetime).month() == dayjs().month()
        );
      });
      const todaySleeps = sleeps.filter((sleep) => {
        return (
          dayjs(sleep.start).date() == dayjs().date() &&
          dayjs(sleep.start).month() == dayjs().month()
        );
      });

      setPlannedMeals(todayMeals);
      setPlannedWorkouts(todayWorkouts);
      setPlannedSleep(todaySleeps);

      setRefresh(0);
    }
  });

  const fetchHighlightedDays = () => {
    setFoodHighlightedDays(
      meals.map((meal) => {
        return dayjs(meal.datetime).date();
      })
    );
    setWorkoutHighlightedDays(
      workouts.map((workout) => {
        return dayjs(workout.datetime).date();
      })
    );
    setSleepHighlightedDays(
      sleeps.map((sleep) => {
        return dayjs(sleep.start).date();
      })
    );
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchHighlightedDays(dayjs());
  });

  const handleMonthChange = (date) => {
    setIsLoading(true);
    fetchHighlightedDays(date);
  };

  return (
    <Box>
      <DateCalendar
        value={selectedDate}
        loading={isLoading}
        onChange={(newValue) => setSelectedDate(newValue)}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            foodHighlightedDays,
            workoutHighlightedDays,
            meals,
            workouts,
            setPlannedMeals,
            setPlannedWorkouts,
          },
        }}
      />
    </Box>
  );
}

export default PlanningDateCalendar;
