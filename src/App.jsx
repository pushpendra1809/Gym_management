import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoute } from "./components/AuthRoute";
import { AdminDashBoard } from "./pages/Admin/DashBoard";
import { UserDashBoard } from "./pages/User/UserDashBoard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/user-dashboard" element={<UserDashBoard />} />
      </Routes>
    </>
  );
}

export default App;
