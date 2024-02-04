import React from "react";
import "./App.css";
import ReportPage from "./pages/ReportPage/ReportPage";
import TeamSettings from "./pages/TeamSettings/TeamSettings";
import Header from "./components/Navbar/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import RoomCreation from "./pages/RoomCreation/RoomCreation";
import { Box } from "@mui/joy";
import VotingRoom from "./pages/VotingRoom/VotingRoom";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import TeamManagement from "./pages/TeamManagement/TeamManagement";

const materialTheme = materialExtendTheme();
function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <Box>
          <Login />
          {/* <BrowserRouter>
     <Routes>
      <Route path='/' element={</>}></Route>
      <Route path='/registration' element={<RegistrationHandler/>}></Route>
     </Routes>
     </BrowserRouter> */}
          {/* <ReportPage /> */}
          {/* <TeamManagement /> */}
          {/* <TeamSettings /> */}
          {/* <RoomCreation /> */}
        </Box>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
    // <VotingRoom />
  );
}

export default App;
