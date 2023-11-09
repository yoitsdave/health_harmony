import * as React from "react";

import { Typography, Button } from "@mui/material";
import { Grid } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";

import dayjs from "dayjs";

function OuterGrid({ children }) {
  return (
    <Grid
      container
      spacing={15}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minWidth: "100vw",
        height: "95vh",
      }}
    >
      {children}
    </Grid>
  );
}

function InnerGrid({ children }) {
  return (
    <Grid
      container
      item
      spacing={6}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}

function GridItem({ children, ...props }) {
  return (
    <Grid item {...props}>
      {children}
    </Grid>
  );
}

function Stopwatch({ setHeader }) {
  React.useEffect(() => {
    setHeader("Stopwatch");

    const interval = setInterval(() => {
      if (!paused) {
        setTime(dayjs().diff(dayjs(startTime)));
      }
    }, 31);

    return () => clearInterval(interval);
  });

  const [time, setTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(0);
  const [paused, setPaused] = React.useState(true);

  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);

  return (
    <OuterGrid>
      <GridItem>
        <Typography variant="h4">
          {dayjs.duration(time).format("mm:ss:SSS")}
        </Typography>
      </GridItem>
      <InnerGrid>
        <GridItem>
          <Button
            variant="contained"
            onClick={() => {
              setPaused(true);
              setTime(0);
            }}
          >
            <RefreshIcon />
          </Button>
        </GridItem>

        <GridItem>
          <Button
            variant="contained"
            onClick={() => {
              if (paused) {
                setStartTime(dayjs());
                setPaused(false);
              } else {
                setPaused(true);
              }
            }}
          >
            {paused ? <PlayArrowIcon /> : <PauseIcon />}
          </Button>
        </GridItem>
      </InnerGrid>
    </OuterGrid>
  );
}

export default Stopwatch;
