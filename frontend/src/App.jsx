import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/signup"
import Login from "./pages/Login"
import SendOtp from "./pages/SendOtp"
import VerifyEmail from "./pages/verifyEmail"
import VerifyOtp from "./pages/VerifyOtp"
import ResetPassword from "./pages/ResetPassword"
import TwoFASetup from "./pages/TwoFASetup"
import TwoFALogin from "./pages/TwoFALogin"
import Profile from "./pages/profile"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */ }
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/send-otp" element={ <SendOtp /> } />
        <Route path="/verify-email" element={ <VerifyEmail /> } />
        <Route path="/verify-otp" element={ <VerifyOtp /> } />
        <Route path="/reset-password" element={ <ResetPassword /> } />
        <Route path="/2fa-login" element={ <TwoFALogin /> } />

        {/* Alias routes for convenience */ }
        <Route path="/forgot-password" element={ <Navigate to="/send-otp?type=forgot" replace /> } />

        {/* Protected routes */ }
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup-2fa"
          element={
            <ProtectedRoute>
              <TwoFASetup />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */ }
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="*" element={ <Navigate to="/login" replace /> } />
      </Routes>
    </AuthProvider>
  )
}

export default App