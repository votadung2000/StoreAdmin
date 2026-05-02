import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='relative hidden md:block bg-zinc-900'>
        <img
          src='/src/assets/images/hero-image.png'
          alt='Hero'
          className='absolute inset-0 w-full h-full object-fill object-center opacity-90'
        />
        <div className='absolute inset-[80px] flex items-start justify-center '>
          <img
            src='/src/assets/svgs/logo.svg'
            alt='Logo'
            className='w-[248px] h-[62px]'
          />
        </div>
      </div>

      <div className='p-[120px] flex items-center justify-center w-full bg-white dark:bg-zinc-950'>
        <div className='mx-auto flex w-full flex-col justify-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
