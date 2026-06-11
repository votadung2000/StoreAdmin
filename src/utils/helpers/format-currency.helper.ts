import { AppLanguage } from '@/i18n';

type CurrencyFormatConfig = {
  locale: string;
  currency: string;
};

const DEFAULT_FRACTION_DIGITS = 0;
const DEFAULT_LANGUAGE = AppLanguage.English;

const currencyConfigByLanguage = {
  [AppLanguage.English]: {
    locale: 'en-US',
    currency: 'USD',
  },
  [AppLanguage.Vietnamese]: {
    locale: 'vi-VN',
    currency: 'VND',
  },
} satisfies Record<AppLanguage, CurrencyFormatConfig>;

export type FormatCurrencyProps = {
  value: number;
  currency?: string;
  language?: AppLanguage;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency({
  value,
  currency,
  language = DEFAULT_LANGUAGE,
  minimumFractionDigits,
  maximumFractionDigits = DEFAULT_FRACTION_DIGITS,
}: FormatCurrencyProps): string {
  const defaultConfig = currencyConfigByLanguage[language];

  return new Intl.NumberFormat(defaultConfig.locale, {
    style: 'currency',
    currency: currency ?? defaultConfig.currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}
