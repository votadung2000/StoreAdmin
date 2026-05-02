import { Button } from '@/components/ui/button';
import GoogleIcon from '@/assets/svgs/google.svg';
import AppleIcon from '@/assets/svgs/apple.svg';
import FacebookIcon from '@/assets/svgs/facebook.svg';

export const SocialAuth = () => {
  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 sm:gap-6'>
        <Button
          variant='outline'
          type='button'
          className='h-14 rounded-md flex items-center justify-center gap-2 px-2 sm:px-4 transition-all'
        >
          <img
            src={GoogleIcon}
            alt='Google'
            className='h-5 w-5'
          />
          <span className='hidden xl:inline text-sm font-medium'>Google</span>
        </Button>
        <Button
          variant='outline'
          type='button'
          className='h-14 rounded-md flex items-center justify-center gap-2 px-2 sm:px-4 transition-all'
        >
          <img
            src={AppleIcon}
            alt='Apple'
            className='h-6 w-6'
          />
          <span className='hidden xl:inline text-sm font-medium'>Apple</span>
        </Button>
        <Button
          variant='outline'
          type='button'
          className='h-14 rounded-md flex items-center justify-center gap-2 px-2 sm:px-4 transition-all'
        >
          <img
            src={FacebookIcon}
            alt='Facebook'
            className='h-6 w-6'
          />
          <span className='hidden xl:inline text-sm font-medium'>Facebook</span>
        </Button>
      </div>
    </>
  );
};
