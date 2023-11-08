import { Container, Grid, TextField, Button, Typography, Select, FormControl, InputLabel, MenuItem, Dialog, DialogContent, DialogActions, DialogTitle} from "@mui/material";
import { Send as SendIcon, Cancel as CancelIcon } from "@mui/icons-material";

import { Tabs, Tab } from '@mui/material';

import { Add as AddIcon } from "@mui/icons-material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";
import * as React from "react";


function GridItem({ children }) {
   return (
     <Grid item sm={12}>
       {children}
     </Grid>
   );
 }
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



function storeSleep(start, end, quality) {
  const formatStart = start.format("h:mm A");
  const formatEnd = end.format("h:mm A");
 
  let sleeps = localStorage.getItem("sleeps");

  if (sleeps == null || sleeps == "") {
    localStorage.setItem("sleeps", JSON.stringify([]));
  }
  sleeps = JSON.parse(localStorage.getItem("sleeps"));

  const newSleep = {
    id: sleeps.length,
    start: start,
    end: end,
    quality: quality
  };

  localStorage.setItem("sleeps", JSON.stringify(sleeps.concat([newSleep])));
}




function SleepEntry({open, setOpen}) {
   const [start, setStart] = React.useState(dayjs());
   const [end, setEnd] = React.useState(dayjs());
   const [quality, setQuality] = React.useState("");


   return(
    <Dialog open={open}>
      <DialogTitle> Log Sleep </DialogTitle>
      <DialogContent>
        <Container maxWidth="xs">
          
            <GridItem>
            <DateTimePicker
               label="Sleep Start Time"
               value={start}
               onChange={(newValue) => setStart(newValue)}
               slotProps={{ textField: { fullWidth: true } }}
             />
            </GridItem>
  
            <InnerGrid>
              <GridItem>
              <DateTimePicker
               label="Sleep End Time"
               value={end}
               onChange={(newValue) => setEnd(newValue)}
               slotProps={{ textField: { fullWidth: true } }}
             />
              </GridItem>
  
              <GridItem>
              <ControlledTextField
               value={quality}
               setValue={setQuality}
               label="Sleep Quality (1-10)"
             />
              </GridItem>
            </InnerGrid>
        </Container>
      </DialogContent>
  
      <DialogActions>
        <Button
          variant="contained"
          endIcon={<CancelIcon />}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            storeSleep(start, end, quality);
            setOpen(false);
          }}
        >
          Add Sleep Log
        </Button>
      </DialogActions>
    </Dialog>
  );
  }


export default SleepEntry;


