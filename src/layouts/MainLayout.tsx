import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const MainLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>
            <div className='shrink-0 flex items-center'>
              <h1 className='text-xl font-bold text-indigo-600'>Store Admin</h1>
            </div>
            <div className='flex items-center'>
              <button
                onClick={handleLogout}
                className='ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className='flex-1 p-6 max-w-7xl mx-auto w-full'>
        <Outlet />
      </main>
    </div>
  );
};
