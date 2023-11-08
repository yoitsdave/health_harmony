import CalendarView from "./pages/calendarView.js";
import DataEntry from "./pages/dataEntry.js";
import Homepage from "./pages/homepage.js";
import Logout from "./pages/logout.js";
import Notifications from "./pages/notifs.js";
import Error404 from "./pages/error404.js";

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
              element={<Notifications setHeader={setHeader} />}
            />

            <Route path="/reset" element={<Logout />} />

            <Route
              path="/personaldataentry"
              element={<DataEntry setHeader={setHeader} />}
            />

            <Route path="/summaryplot" element={<VisualSummary setHeader={setHeader} />} />

            <Route
              path="/calendarview"
              element={<CalendarView setHeader={setHeader} />}
            />

            <Route path="/" element={<Homepage setHeader={setHeader} />} />

            <Route path="*" element={<Error404 setHeader={setHeader} />} />
          </Routes>
        </AppBar>
      </LocalizationProvider>
    </HashRouter>
  );
}

export default App;
