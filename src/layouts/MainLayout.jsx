import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import useAuth from '../features/auth/hooks/useAuth';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="main-layout bg-[#f8f9fa] min-height-screen">
      <Navbar role="client" user={user} />
      <main>
        <Outlet />
      </main>
      {/* Footer could go here */}
    </div>
  );
};

export default MainLayout;
