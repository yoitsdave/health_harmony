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
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuAppBar({ children, page }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuShown, setMenuShown] = React.useState(false);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setMenuShown(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuShown(false);
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
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor={"left"}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={menuShown}
            onClose={handleClose}
          >
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
              <ListItem key="summaryplot" disablePadding>
                <ListItemButton onClick={handleLink("summaryplot")}>
                  <ListItemIcon>
                    <AutoGraphIcon />
                  </ListItemIcon>
                  <ListItemText primary="Summary Plots" />
                </ListItemButton>
              </ListItem>
              <ListItem key="notifications" disablePadding>
                <ListItemButton onClick={handleLink("notifications")}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
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
        </Toolbar>
      </AppBar>

      {children}
    </Box>
  );
}
