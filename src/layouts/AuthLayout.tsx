import { Outlet } from '@tanstack/react-router';
import HeroImage from '@/assets/images/hero-image.jpg';
import Logo from '@/assets/svgs/logo.svg';
import { AppLanguageSwitcher } from '@/components/shared/app-language-switcher';

export const AuthLayout = () => {
  return (
    <div className='min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='relative hidden md:block bg-zinc-900'>
        <img
          src={HeroImage}
          alt='Hero'
          className='absolute inset-0 w-full h-full object-cover object-center opacity-90'
        />
        <div className='absolute inset-[80px] flex items-start justify-center'>
          <img
            src={Logo}
            alt='Logo'
            className='w-[248px] h-[62px]'
          />
        </div>
      </div>

      <div className='relative md:h-full md:overflow-y-auto flex items-center justify-center w-full bg-white dark:bg-zinc-950 px-6 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-[120px]'>
        <AppLanguageSwitcher className='absolute right-6 top-6 sm:right-10 md:right-14 lg:right-16 xl:right-[120px]' />
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
