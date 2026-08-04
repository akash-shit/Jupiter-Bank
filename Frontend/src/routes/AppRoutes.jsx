import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/Dashboard/Accounts";
import TransferMoney from "../pages/Dashboard/TransferMoney";
import Transactions from "../pages/Dashboard/Transactions";
import Profile from "../pages/Dashboard/Profile";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AddFunds from "../pages/Dashboard/AddFunds";
import CreateAccount from "../pages/Dashboard/CreateAccount";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Accounts />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TransferMoney />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

          <Route
            path="/create-account"
            element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateAccount />
              </DashboardLayout>
            </ProtectedRoute>
            }
          />

        <Route
          path="/add-funds"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddFunds />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* If route doesn't exist */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;