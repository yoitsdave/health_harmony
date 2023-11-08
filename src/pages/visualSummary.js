import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BarChart } from '@mui/x-charts/BarChart';

import { Cancel as CancelIcon } from "@mui/icons-material"; // Import CancelIcon
import dayjs from "dayjs";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";


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
  )}

function VisualSummary({setHeader}) {
  React.useEffect(() => setHeader("Summary Plots"));
  const [range, setRange] = React.useState("Monthly");
  const [category, setCategory] = React.useState("Calories Consumed");
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

  const handleCancel = () => {
    setPopupOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Toolbar/>
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

          {/* Use a "Cancel" button with the same style as the "SleepEntry" component */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancel}
            endIcon={<CancelIcon />} // Use CancelIcon
            style={{ marginLeft: 400 }} 
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default VisualSummary;
