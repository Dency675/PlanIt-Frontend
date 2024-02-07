import React from "react";
import "./App.css";
import ReportPage from "./pages/ReportPage/ReportPage";
import TeamSettings from "./pages/TeamSettings/TeamSettings";
import Header from "./components/Navbar/Header";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AppRouter from "./Routes";
import Admin from "./pages/Admin/Admin";
<<<<<<< HEAD
import Users from "./pages/Admin/Admin";
=======
>>>>>>> d978ffc (added basic routing)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const materialTheme = materialExtendTheme();
function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
<<<<<<< HEAD
        <Box>
          {/* <BrowserRouter>
     <Routes>
      <Route path='/' element={</>}></Route>
      <Route path='/registration' element={<RegistrationHandler/>}></Route>
     </Routes>
     </BrowserRouter> */}
          {/* <ReportPage /> */}

          {/* <TeamSettings /> */}
          {/* <RoomCreation /> */}
          <AppRouter />
        </Box>
=======
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/team-management" element={<TeamManagement />} />
            <Route path="/team-settings" element={<TeamSettings />} />
            <Route path="/room-creation" element={<RoomCreation />} />
            <Route path="/voting-room" element={<VotingRoom />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
>>>>>>> d978ffc (added basic routing)
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
