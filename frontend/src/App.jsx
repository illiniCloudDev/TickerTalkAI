import { useState, useEffect, useMemo } from "react";
import {
    Route,
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider,
    Navigate
} from 'react-router-dom';

import MainLayout from "./layouts/MainLayout";

//Feature pages
import HomePage from "./pages/HomePage";
import Documents from './pages/Documents';
import CheatSheet from './pages/CheatSheet';
import RedFlags from './pages/RedFlags';
import Insiders from './pages/Insiders';
import LoginPage from './pages/LoginPage';
import GuidePage from "./pages/GuidePage";



//Route protection wrapper
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

  const router = useMemo(() => createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>

        {/* Core path */}
        <Route index element={<HomePage/>} />

        {/* Feature Routing */}
        <Route path="guide" element={<GuidePage />}/>
        <Route path="documents" element={<Documents />}/>
        <Route path="cheatsheet" element={<CheatSheet />}/>
        <Route path="redflags" element={<RedFlags />}/>

        {/* Protected Feature - Perfect for tracking user's bookmarked trackers */}
        <Route path="insiders" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Insiders />
            </ProtectedRoute>
        } />

        {/* Auth Interface Portals */}
        <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      
      </Route>

    )
  ),[isLoggedIn]);

  if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center"> 
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
  }

  return (<RouterProvider router={router} />)
}

export default App;