import React from "react";
import "./App.css";
import ReportPage from "./pages/ReportPage/ReportPage";
import TeamSettings from "./pages/TeamSettings/TeamSettings";
import Header from "./components/Navbar/Header";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomCreation from "./pages/RoomCreation/RoomCreation";
import { Box } from "@mui/joy";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import AppRouter from "./Routes";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Admin/Admin";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const materialTheme = materialExtendTheme();
function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <Box>
          {/* <BrowserRouter>
     <Routes>
      <Route path='/' element={</>}></Route>
      <Route path='/registration' element={<RegistrationHandler/>}></Route>
     </Routes>
     </BrowserRouter> */}
          {/* <ReportPage /> */}

          {/* <ReportPage /> */}
          {/* 
          <ReportPage /> */}
          {/* <TeamManagement /> */}
          {/* <TeamSettings /> */}
          {/* <VotingRoom/> */}
          {/* <RoomCreation /> */}
          <AppRouter />
        </Box>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
