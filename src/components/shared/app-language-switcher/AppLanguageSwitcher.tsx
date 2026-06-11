import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AppLanguage } from '@/i18n';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const languageOptions = [
  {
    value: AppLanguage.English,
    labelKey: 'language.english.short',
    nameKey: 'language.english.name',
  },
  {
    value: AppLanguage.Vietnamese,
    labelKey: 'language.vietnamese.short',
    nameKey: 'language.vietnamese.name',
  },
] as const;

export type AppLanguageSwitcherProps = {
  className?: string;
};

export function AppLanguageSwitcher({ className }: AppLanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      className={cn(
        'inline-flex h-9 items-center rounded-md border bg-background p-0.5 text-sm shadow-sm',
        className,
      )}
      role='group'
      aria-label={t('language.label')}
    >
      <Languages className='mx-2 h-4 w-4 text-muted-foreground' />
      {languageOptions.map((option) => {
        const isSelected = language === option.value;

        return (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                aria-pressed={isSelected}
                aria-label={t(option.nameKey)}
                onClick={() => {
                  void i18n.changeLanguage(option.value);
                }}
                className={cn(
                  'h-7 px-2 text-xs font-semibold',
                  isSelected && 'bg-primary text-primary-foreground shadow-sm',
                )}
              >
                {t(option.labelKey)}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t(option.nameKey)}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
