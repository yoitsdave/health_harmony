import FoodEntry from "./pages/foodEntry.js";
import SleepEntry from "./pages/sleepEntry.js";
import WorkoutEntry from "./pages/workoutEntry.js";

import AppBar from "./components/appBar.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <BrowserRouter>
      <AppBar>
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
            element={
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                personal data entry
              </Typography>
            }
          />

          <Route path="/foodplan" element={<FoodEntry />} />

          <Route path="/workoutplan" element={<WorkoutEntry />} />

          <Route path="/sleepplan" element={<SleepEntry />} />

          <Route
            path="/summaryplot"
            element={
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                summary plots
              </Typography>
            }
          />

          <Route
            path="/calendarview"
            element={
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                calendar view
              </Typography>
            }
          />

          <Route
            path="/"
            element={
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                homepage
              </Typography>
            }
          />

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
    </BrowserRouter>
  );
}

export default App;
