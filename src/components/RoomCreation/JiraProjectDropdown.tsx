import * as React from "react";
import { selectClasses } from "@mui/joy/Select";
import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const JiraProjectDropdown = () => {
  return (
    <div>
      <Select
        placeholder="Choose Project"
        fullWidth
        size="small"
        // onChange={}
        IconComponent={KeyboardArrowDown}
        sx={{
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
      ></Select>
    </div>
  );
};

export default JiraProjectDropdown;
