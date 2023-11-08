import FoodEntry from "./pages/foodEntry.js";
import CalendarView from "./pages/calendarView.js";
import SleepEntry from "./pages/sleepEntry.js";
import WorkoutEntry from "./pages/workoutEntry.js";
import DataEntry from "./pages/dataEntry.js";
import Homepage from "./pages/homepage.js";

import AppBar from "./components/appBar.js";

import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import VisualSummary from "./pages/visualSummary.js";

function App() {
  const [header, setHeader] = React.useState("Health Harmony");

  return (
    <HashRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBar page={header}>
          <Routes>
            <Route
              path="/notifications"
              element={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Notifications
                </Typography>
              }
            />

            <Route
              path="/reset"
              element={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  reset
                </Typography>
              }
            />

            <Route
              path="/personaldataentry"
              element={<DataEntry setHeader={setHeader} />}
            />

            <Route
              path="/foodplan"
              element={<FoodEntry setHeader={setHeader} />}
            />

            <Route path="/workoutplan" element={<WorkoutEntry />} />

            <Route path="/sleepplan" element={<SleepEntry />} />

            <Route path="/summaryplot" element={<VisualSummary />} />

            <Route
              path="/calendarview"
              element={<CalendarView setHeader={setHeader} />}
            />

            <Route path="/" element={<Homepage setHeader={setHeader} />} />

            <Route
              path="*"
              element={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  404 get outta here
                </Typography>
              }
            />
          </Routes>
        </AppBar>
      </LocalizationProvider>
    </HashRouter>
  );
}

export default App;
