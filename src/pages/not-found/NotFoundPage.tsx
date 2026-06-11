import { ROUTES } from '@/constants/routes';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageState } from '@/components/shared/app-page-state';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex min-h-svh items-center justify-center bg-muted/30 p-6'>
      <PageState
        variant='empty'
        title={t('notFound.title')}
        description={t('notFound.description')}
        className='w-full max-w-lg'
      />
      <Button
        asChild
        className='fixed bottom-6'
      >
        <Link to={ROUTES.MAIN.DASHBOARD}>
          <ArrowLeft />
          {t('notFound.action')}
        </Link>
      </Button>
    </div>
  );
};
