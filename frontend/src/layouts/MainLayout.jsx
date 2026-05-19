import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar remains permanently visible across all pages */}
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* The main viewport displays whatever page is matched by the browser URL */}
      <main className="flex-1 pl-64 p-8 overflow-x-hidden">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;