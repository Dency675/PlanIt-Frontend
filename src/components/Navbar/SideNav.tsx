import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Home from "@mui/icons-material/Home";
import TeamName from "../TeamSettings/TeamName";

export default function SideNav() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        // display: { xs: "none", md: "flex" },

        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
        "& > *": { minWidth: 0, flexBasis: 200 },
      }}
    >
      <div>
        <Typography level="body-xs" mb={2}></Typography>
        <List
          sx={{
            borderRadius: "sm",
          }}
        >
          <ListItem sx={{ paddingBottom: 3 }}>
            <ListItemDecorator>
              <Home />
            </ListItemDecorator>
            Team List
          </ListItem>
          <TeamName />
        </List>
      </div>
    </Box>
  );
}
