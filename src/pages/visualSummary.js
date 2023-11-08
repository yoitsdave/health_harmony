import { Container, Grid, TextField, Fab, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";



import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { BarChart } from '@mui/x-charts/BarChart';

import dayjs from "dayjs";

import * as React from "react";



function GridItem({ children }) {
  return (
    <Grid item sm={12}>
      {children}
    </Grid>
  )}
  
  function InnerGrid({ children }) {
    return (
      <Grid
        item
        container
        sm={12}
        spacing={1}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {children}
      </Grid>
    );
  }

  function ControlledTextField({ value, setValue, label }) {
    return (
      <TextField
        fullWidth
        id={label}
        aria-label={label}
        label={label}
        variant="outlined"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    );
  }

  // function storeSleep(start, end, quality, range) {
  //   alert(`Logged sleep from ${start} to ${end}. Quality: ${quality}, Range: ${range}`);
  // }

function VisualSummary() {
  // const [start, setStart] = React.useState(dayjs());
  // const [end, setEnd] = React.useState(dayjs());
  // const [quality, setQuality] = React.useState("");
  const [range, setRange] = React.useState("Monthly");
  const [category, setCategory] = React.useState("Calories Consumed");
  const [visualSummary, setVisualSummary] = React.useState("Line Graph");
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  return (
    <Container maxWidth="xs">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InnerGrid>
          <GridItem>
            <Typography variant="h6">Time Range</Typography>
            <Select
              fullWidth
              label="Time Range"
              value={range}
              onChange={handleRangeChange}
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Daily">Daily</MenuItem>
            </Select>
          </GridItem>

          <GridItem>
            <Typography variant="h6">Category</Typography>
            <Select
              fullWidth
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="Calories Consumed">Calories Consumed</MenuItem>
              <MenuItem value="Time spent sleeping">Time spent sleeping</MenuItem>
              <MenuItem value="Time spent working out">Time spent working out</MenuItem>
            </Select>
          </GridItem>

          <GridItem>
            <Typography variant="h6">Type of Visual Summary</Typography>
            <Select
              fullWidth
              label="Category"
              value={visualSummary}
              onChange={(event) => setVisualSummary(event.target.value)}
            >
              <MenuItem value="Line Graph">Line Graph</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Bar Chart">Bar Chart</MenuItem>
            </Select>
          </GridItem>

          <GridItem>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
              }}
              onClick={handlePopupOpen}
            >
              <AddIcon />
            </Fab>
          </GridItem>
          <GridItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePopupOpen}
            >
              Submit
            </Button>
          </GridItem>
        </InnerGrid>
      </LocalizationProvider>
      <Dialog open={isPopupOpen} onClose={handlePopupClose}>
        <DialogTitle>Selected Options</DialogTitle>
        <DialogContent>
          <BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: ['bar A', 'bar B', 'bar C'],
                scaleType: 'band',
              },
            ]}
            series={[
              {
                data: [2, 5, 3],
              },
            ]}
            width={500}
            height={300}
          />

  
          <p>Time : {range}</p>
          <p>Category: {category}</p>
          <p>Type of Visual Summary: {visualSummary}</p>
        </DialogContent>
      </Dialog>
    </Container>
  );

  
}

export default VisualSummary;
