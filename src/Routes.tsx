import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { UserRoleProvider } from "./pages/Login/Context/UserRoleContext";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import LoginPage from "../src/pages/Login/Login";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./pages/Login/Authentication/authConfig";
import TeamManagement from "./pages/TeamManagement/TeamManagement";
import TeamSettings from "./pages/TeamSettings/TeamSettings";
import VotingRoom from "./pages/VotingRoom/VotingRoom";
import ReportPage from "./pages/ReportPage/ReportPage";
import RoomCreation from "./pages/RoomCreation/RoomCreation";

const msalInstance = new PublicClientApplication(msalConfig);
const AppRoutes = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <UserRoleProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<TeamManagement />} />
          </Route>
          <Route
            path="/project_manager"
            element={
              <ProtectedRoute allowedRoles={["project manager"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          >
            <Route path="settings" element={<TeamSettings />} />
            <Route path="vote" element={<VotingRoom />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
          <Route
            path="/product_owner"
            element={
              <ProtectedRoute allowedRoles={["product owner"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          >
            <Route path="vote" element={<VotingRoom />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
          <Route
            path="/scrum_master"
            element={
              <ProtectedRoute allowedRoles={["scrum master"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          >
            <Route path="room" element={<RoomCreation />} />
            <Route path="vote" element={<VotingRoom />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
          <Route
            path="/developer"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          >
            <Route path="vote" element={<VotingRoom />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
        </Routes>
      </UserRoleProvider>
    </MsalProvider>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;
