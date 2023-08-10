import React from "react";
import DowntimeForm from "../Modules/DowntimeForm";
import DowntimeTable from "../Modules/DowntimeTable";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { DowntimeProvider } from "../../API/DowntimeContext";

export default function Home() {
  return (
    <div className="Home">
      <DowntimeProvider>
        <Box m={7} p={2}>
          <Typography variant="h2" gutterBottom>
            LCO Telescope Downtime Web Tool
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={12} lg={3}>
              <Paper elevation={5}>
                <Box p={4}>
                  <DowntimeForm />
                </Box>
              </Paper>
            </Grid>
            <Grid item md={12} lg={9}>
              <Paper elevation={5}>
                <Box p={3}>
                  <DowntimeTable />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </DowntimeProvider>
    </div>
  );
}
