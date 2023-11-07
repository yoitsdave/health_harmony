import { Grid } from "@mui/material";

function ContainerGrid({ children }) {
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
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

export { ContainerGrid, GridItem };
