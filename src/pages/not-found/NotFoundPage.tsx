import { ROUTES } from '@/constants/routes';
import { Link } from '@tanstack/react-router';

export const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <h1 className='text-6xl font-bold text-indigo-600 mb-4'>404</h1>
      <p className='text-xl text-gray-700 mb-8'>Page not found</p>
      <Link
        to={ROUTES.MAIN.DASHBOARD}
        className='px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'
      >
        Home
      </Link>
    </div>
  );
};
