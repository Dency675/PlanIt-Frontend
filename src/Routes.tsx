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
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          >
            {/* <Route path="home" element={<TeamManagement />} /> */}
          </Route>

          {/* Routes for developers */}
          <Route
            path="/home"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <TeamManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developer/settings"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <TeamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developer/vote"
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
            path="/developer/room"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <RoomCreation />
              </ProtectedRoute>
            }
          />

          {/* Routes for product managers */}
          <Route
            path="/project_manager"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "developer", "project manager"]}
              >
                <TeamManagement />
              </ProtectedRoute>
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
            path="/project_manager/report"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project_manager/room"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <RoomCreation />
              </ProtectedRoute>
            }
          />

          {/* Routes for developers */}
          {/* <Route
            path="/developer"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <TeamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <VotingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="report"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <ReportPage />
              </ProtectedRoute>
            }
          /> */}

          {/* Routes for product_manager */}
          {/* <Route
            path="/product_manager"
            element={
              <ProtectedRoute allowedRoles={["product manager"]}>
                <TeamManagement />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={["product manager"]}>
                <TeamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute allowedRoles={["product manager"]}>
                <VotingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute allowedRoles={["product manager"]}>
                <ReportPage />
              </ProtectedRoute>
            }
          /> */}

          {/* Routes for scrum masters */}
          <Route
            path="/scrum_master"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <TeamManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scrum_master/settings"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <TeamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scrum_master/vote"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
              >
                <VotingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scrum_master/report"
            element={
              <ProtectedRoute
                allowedRoles={["scrum master", "project manager", "developer"]}
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
