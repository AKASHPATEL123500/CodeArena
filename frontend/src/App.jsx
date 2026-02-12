import { Routes, Route, Navigate } from 'react-router-dom';
import CodeArenaImproved from './pages/home';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Profile from './pages/profile';
import Skills from './pages/skill';
export const API = "http://localhost:1600/api/v1"

// ✅ wrappers yahin hone chahiye
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? <Navigate to="/profile" replace /> : children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<CodeArenaImproved />} />

      <Route path="/signup" element={
        <PublicRoute><SignUp /></PublicRoute>
      } />

      <Route path="/signin" element={
        <PublicRoute><SignIn /></PublicRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />

      <Route path="/skills" element={
        <ProtectedRoute><Skills /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
