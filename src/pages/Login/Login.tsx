import * as React from "react";
import CssBaseline from "@mui/joy/CssBaseline";
import LeftComponent from "../../components/Login/LeftComponent";
import RightComponent from "../../components/Login/RightComponent";

export default function Login() {
  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      {/* <ModeToggle /> */}
      <CssBaseline />
      <LeftComponent />
      <RightComponent />
    </main>
  );
}
