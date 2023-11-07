import { Container, Grid, TextField, Fab, Typography } from "@mui/material";
import { Tabs, Tab } from '@mui/material';
import Button from '@mui/material/Button';



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




function storeSleep(start,end,quality) {
 const formatStart = start.format("h:mm A");
 const formatEnd = end.format("h:mm A");
  
 alert(`Logged sleep from (${formatStart}) to (${formatEnd}), Quality: ${quality}`);
}




function SleepEntry() {
   const [start, setStart] = React.useState(dayjs());
   const [end, setEnd] = React.useState(dayjs());
   const [quality, setQuality] = React.useState("");


   return(
       <Container maxWidth="xs">
     <LocalizationProvider dateAdapter={AdapterDayjs}>
       <InnerGrid>
         <GridItem>
           <DateTimePicker
             label="Sleep Start Time"
             value={start}
             onChange={(newValue) => setStart(newValue)}
             slotProps={{ textField: { fullWidth: true } }}
           />
         </GridItem>


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


         <Button
            variant="contained" 
            color="primary"
              sx={{
                margin: '8px',
                padding: '10px 20px', 
              }}
              onClick={() => storeSleep(start, end, quality)}
            >
              Log your Sleep
        </Button>
       </InnerGrid>
     </LocalizationProvider>
   </Container>
    );
}


export default SleepEntry;

