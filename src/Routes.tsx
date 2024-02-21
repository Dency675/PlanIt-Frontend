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
import Admin from "./pages/Admin/Admin";

const msalInstance = new PublicClientApplication(msalConfig);
const AppRoutes = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <UserRoleProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Routes for admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          ></Route>

          {/* Routes for developers */}
          <Route
            path="/home"
            element={
              <>
                <ProtectedRoute
                  allowedRoles={[
                    "scrum master",
                    "developer",
                    "project manager",
                  ]}
                >
                  <TeamManagement />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/teamSettings/:teamId"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <TeamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote/:sessionId"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <VotingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report/:sessionId"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roomCreation/:teamId"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <RoomCreation />
              </ProtectedRoute>
            }
          />
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
