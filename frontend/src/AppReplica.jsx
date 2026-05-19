import { useState, useEffect, useMemo } from 'react';
import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider,
    Navigate
} from 'react-router-dom';


import MainLayout from './layouts/MainLayout';


import HomePage from './pages/HomePage';
import Documents from './pages/Documents';
import CheatSheet from './pages/CheatSheet';
import RedFlags from './pages/RedFlags';
import Insiders from './pages/Insiders';
import LoginPage from './pages/LoginPage';

// Mock API service wrapper (Uncomment for MongoDB Auth later)
// import api from './services/api'; 

/**
 * Route protection wrapper. 
 * For now, it passes straight through without auth blockers.
 * force-redirect unauthorized traffic.
 */
const ProtectedRoute = ({ isLoggedIn, children }) => {
    // Temp Bypass: Allows deployment testing before backend auth collections are built
    const tempBypass = true; 
    
    if (!isLoggedIn && !tempBypass) {
        return <Navigate to='/login' replace />;
    }
    return children;
};

const App = () => {
    // Defaulting to true for now
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(false); // set to false initially for bypass

    /* ===========================================================================
    FUTURE AUTH SYNC LAYER (Uncomment at the end project)
    ===========================================================================
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setLoading(true);
                const res = await api.get('/api/auth/me');
                if (res.data.success) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
                console.log('No active user session detected.');
            } finally {
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);
    */

    // Browser URL Mapping Definitions
    const router = useMemo(() => createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
                {/* Default Core App Landing Path */}
                <Route index element={<HomePage />} />
                
                {/* Feature Routing Declarations */}
                <Route path="documents" element={<Documents />} />
                <Route path="cheatsheet" element={<CheatSheet />} />
                <Route path="redflags" element={<RedFlags />} />
                
                {/* Protected Feature - Perfect for tracking user's bookmarked trackers */}
                <Route path="insiders" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Insiders />
                    </ProtectedRoute>
                } />
                
                {/* Auth Interface Portals */}
                <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                
                {/* Catch-all fallback router */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        )
    ), [isLoggedIn]);

    
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center"> 
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return <RouterProvider router={router} />;
};

export default App;