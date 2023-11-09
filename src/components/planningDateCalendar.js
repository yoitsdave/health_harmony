import { Popover, Badge, Box, Paper } from "@mui/material";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

import * as React from "react";

import dayjs from "dayjs";

function ServerDay({
  outsideCurrentMonth,
  day,
  meals,
  workouts,
  sleeps,
  setPlannedMeals,
  setPlannedWorkouts,
  setPlannedSleep,
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
  const dayOfSleeps = sleeps.filter((sleep) => {
    return (
      dayjs(sleep.start).date() == day.date() &&
      dayjs(sleep.start).month() == day.month()
    );
  });

  let numPlans = dayOfMeals.length + dayOfWorkouts.length + dayOfSleeps.length;
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
          setPlannedSleep(dayOfSleeps);
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
          dayjs(meal.datetime).date() == dayjs(selectedDate).date() &&
          dayjs(meal.datetime).month() == dayjs(selectedDate).month()
        );
      });
      const todayWorkouts = workouts.filter((workout) => {
        return (
          dayjs(workout.datetime).date() == dayjs(selectedDate).date() &&
          dayjs(workout.datetime).month() == dayjs(selectedDate).month()
        );
      });
      const todaySleeps = sleeps.filter((sleep) => {
        return (
          dayjs(sleep.start).date() == dayjs(selectedDate).date() &&
          dayjs(sleep.start).month() == dayjs(selectedDate).month()
        );
      });

      setPlannedMeals(todayMeals);
      setPlannedWorkouts(todayWorkouts);
      setPlannedSleep(todaySleeps);

      setRefresh(0);
    }
  });

  const handleMonthChange = (date) => {
    return null;
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
            meals,
            workouts,
            sleeps,
            setPlannedMeals,
            setPlannedWorkouts,
            setPlannedSleep,
          },
        }}
      />
    </Box>
  );
}

export default PlanningDateCalendar;
