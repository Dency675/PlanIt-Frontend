// CreateRoomForm.tsx
import React from "react";
import { Button, useTheme } from "@mui/joy/";
import RoomNameInput from "./RoomNameInput";
import EstimationScaleDropdown from "./EstimationScaleDropdown";
import FileSelector from "./FileSelector";
import TimerInput from "./TimerInput";
import GuestInput from "./GuestInput";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Grid from "@mui/joy/Grid";

import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import SideNav from "../TeamSettings/SideNav";

const CreateRoomForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };
  // const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // const toggleTeamListDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
          <Grid xs={3}>
            <SideNav></SideNav>
            {isSmallScreen ? (
              <Drawer variant="temporary">
                {/* Drawer content goes here */}
              </Drawer>
            ) : (
              <Box></Box>
              // <TeamListDrawer />
            )}
          </Grid>
          <Grid xs={12}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid container xs={10} mx="auto">
                <Card>
                  <Typography level="h2">Create Room</Typography>

                  <Grid container xs={11} mx="auto" spacing={3}>
                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">Room Name</Typography>
                      </Grid>
                      <Grid xs={12}>
                        <RoomNameInput />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">
                          Estimation Value
                        </Typography>
                      </Grid>
                      <Grid xs={12}>
                        <EstimationScaleDropdown />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">Add Guest</Typography>
                      </Grid>
                      <Grid xs={12}>
                        <GuestInput />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">Set Timer</Typography>
                      </Grid>
                      <Grid>
                        <TimerInput />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      xs={12}
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Typography level="title-lg">User Story</Typography>
                      </Grid>
                      <Grid>
                        <FileSelector />
                      </Grid>
                    </Grid>

                    <Grid xs={12} mt={3}>
                      <Button type="Create" color="success">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateRoomForm;
