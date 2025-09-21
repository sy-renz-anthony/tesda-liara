import { Routes, Route} from 'react-router-dom';

import PublicHome from './pages/PublicHome';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './ProtectedRoute';
import StaffLogin from "./pages/StaffLogin";
import RequestResetPassword from "./pages/RequestPasswordResetCode";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from './pages/Dashboard';
import AddAccount from "./pages/AddAccount";
import Logout from './pages/Logout';
import MyAccount from "./pages/MyAccount";
import ChangePassword from "./pages/ChangePassword";
import UpdateAccount from './pages/UpdateAccount';
import Logs from "./pages/Logs";

function App() {
  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicHome />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/request-password-reset" element={<RequestResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-account" element={<ProtectedRoute ><AddAccount /></ProtectedRoute> } />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>}/>
        <Route path="/update-my-account" element={<ProtectedRoute><UpdateAccount /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App