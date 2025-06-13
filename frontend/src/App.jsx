import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} allowedRoles={['admin']} />} />
        <Route path="/user" element={<ProtectedRoute element={UserDashboard} allowedRoles={['user']} />} />
        <Route path="/owner" element={<ProtectedRoute element={OwnerDashboard} allowedRoles={['store-owner']} />} />
        

<Route
  path="/update-password"
  element={<ProtectedRoute element={UpdatePassword} allowedRoles={['user', 'store-owner']} />}
/>

      </Routes>
    </BrowserRouter>
  );
}
export default App;