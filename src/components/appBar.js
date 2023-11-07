import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function MenuAppBar({ children, page }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuShown, setMenuShown] = React.useState(false);
  const [settingsShown, setSettingsShown] = React.useState(false);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setMenuShown(true);
    setSettingsShown(false);
  };

  const handleSettings = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSettingsShown(true);
    setMenuShown(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuShown(false);
    setSettingsShown(false);
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
      <AppBar position="static" style={{ margin: 0 }} disableGutters={true}>
        <Toolbar disableGutters={true} variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSettings}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={menuShown}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLink("notifications")}>
              Notifications
            </MenuItem>
            <MenuItem onClick={handleLink("reset")}>Reset</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {page}
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="settings-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={settingsShown}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLink("")}>Homepage</MenuItem>
                <MenuItem onClick={handleLink("personaldataentry")}>
                  PersonalDataEntry
                </MenuItem>
                <MenuItem onClick={handleLink("foodplan")}>FoodPlan</MenuItem>
                <MenuItem onClick={handleLink("workoutplan")}>
                  WorkoutPlan
                </MenuItem>
                <MenuItem onClick={handleLink("sleepplan")}>SleepPlan</MenuItem>
                <MenuItem onClick={handleLink("summaryplot")}>
                  SummaryPlots
                </MenuItem>
                <MenuItem onClick={handleLink("calendarview")}>
                  CalendarView
                </MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
}
