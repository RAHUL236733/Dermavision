import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from './services/api';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ImageUpload from './pages/ImageUpload';
import About from './pages/About';
import Contact from './pages/Contact';


// Dashboard Subpages
import Overview from './pages/dashboard/Overview';
import DiseaseName from './pages/dashboard/DiseaseName';
import Precautions from './pages/dashboard/Precautions';
import Summary from './pages/dashboard/Summary';
import ConfidenceScore from './pages/dashboard/ConfidenceScore';
import DietPlan from './pages/dashboard/DietPlan';

function RequireAuth({ children }) {
    const location = useLocation();
    const currentUser = getCurrentUser();

    if (!currentUser?.id) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* Protected Routes */}
                <Route
                    path="/profile"
                    element={<RequireAuth><MainLayout><Profile /></MainLayout></RequireAuth>}
                />

                {/* Analysis Routes */}
                <Route
                    path="/upload"
                    element={<RequireAuth><MainLayout><ImageUpload /></MainLayout></RequireAuth>}
                />

                <Route path="/dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
                    <Route index element={<Overview />} />
                    <Route path="disease" element={<DiseaseName />} />
                    <Route path="precautions" element={<Precautions />} />
                    <Route path="summary" element={<Summary />} />
                    <Route path="confidence" element={<ConfidenceScore />} />
                    <Route path="diet" element={<DietPlan />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
