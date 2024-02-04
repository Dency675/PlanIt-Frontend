import * as React from "react";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <>
      <Input
        size="lg"
        placeholder="Search user and teams"
        endDecorator={<SearchIcon />}
        sx={{
          mt: 2,
          "&::before": {
            border: "0.1px solid var(--Input-focusedHighlight)",
            transform: "scaleX(0)",
            left: "2.5px",
            right: "2.5px",
            bottom: 0,
            top: "unset",
            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
            borderRadius: 0,
            borderBottomLeftRadius: "64px 20px",
            borderBottomRightRadius: "64px 20px",
          },
          "&:focus-within::before": {
            transform: "scaleX(1)",
          },
        }}
      />
    </>
  );
}
