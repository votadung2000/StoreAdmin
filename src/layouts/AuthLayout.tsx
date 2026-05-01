import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Store Admin Auth
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
