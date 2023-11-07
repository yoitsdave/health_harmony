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
      meal.datetime.date() == day.date() && meal.datetime.month() == day.month()
    );
  });
  const dayOfWorkouts = workouts.filter((workout) => {
    return (
      workout.datetime.date() == day.date() &&
      workout.datetime.month() == day.month()
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
          console.log(dayOfMeals);
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
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [foodHighlightedDays, setFoodHighlightedDays] = React.useState([]);
  const [workoutHighlightedDays, setWorkoutHighlightedDays] = React.useState(
    []
  );

  const fetchHighlightedDays = () => {
    setFoodHighlightedDays(
      meals.map((meal) => {
        return meal.datetime.date();
      })
    );
    setWorkoutHighlightedDays(
      workouts.map((workout) => {
        return workout.datetime.date();
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

  const meals = [
    {
      id: 1,
      name: "meat",
      protein: 4,
      carbs: 3,
      fat: 4,
      calories: 150,
      datetime: dayjs("2023-11-01", "YYYY-MM-DD"),
    },
    {
      id: 2,
      name: "stew",
      protein: 4,
      carbs: 3,
      fat: 4,
      calories: 150,
      datetime: dayjs("2023-11-03", "YYYY-MM-DD"),
    },
    {
      id: 3,
      name: "sammy",
      protein: 4,
      carbs: 3,
      fat: 4,
      calories: 150,
      datetime: dayjs("2023-11-05", "YYYY-MM-DD"),
    },
    {
      id: 4,
      name: "sammy 2",
      protein: 4,
      carbs: 3,
      fat: 4,
      calories: 150,
      datetime: dayjs("2023-11-05", "YYYY-MM-DD"),
    },
  ];
  const workouts = [
    {
      id: 1,
      name: "lift",
      calories: 150,
      datetime: dayjs("2023-11-01", "YYYY-MM-DD"),
    },
    {
      id: 2,
      name: "run",
      calories: 150,
      datetime: dayjs("2023-11-03", "YYYY-MM-DD"),
    },
    {
      id: 3,
      name: "swim",
      calories: 150,
      datetime: dayjs("2023-11-05", "YYYY-MM-DD"),
    },
  ];

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
