import React from "react";
import "./App.css";
import ReportPage from "./pages/ReportPage/ReportPage";
import TeamSettings from "./pages/TeamSettings/TeamSettings";
import Header from "./components/Navbar/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import RoomCreation from "./pages/RoomCreation/RoomCreation";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <BrowserRouter>
     <Routes>
      <Route path='/' element={</>}></Route>
      <Route path='/registration' element={<RegistrationHandler/>}></Route>
     </Routes>
     </BrowserRouter> */}
      {/* <ReportPage /> */}

      <TeamSettings />
      {/* <RoomCreation /> */}
    </>
  );
}

export default App;
