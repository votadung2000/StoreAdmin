import { categoryStatusKey } from './category';
import { fulfillmentStatusKey, priorityStatusKey } from './order';
import { paymentStatusKey } from './payment';
import { audienceKey, productStatusKey } from './product';
import { genericStatusKey } from './status';
import { timeKey } from './time';

const valueTranslationKey: Record<string, string> = {
  ...productStatusKey,
  ...categoryStatusKey,
  ...paymentStatusKey,
  ...fulfillmentStatusKey,
  ...priorityStatusKey,
  ...audienceKey,
  ...genericStatusKey,
  ...timeKey,
};

export function getValueTranslationKey(
  value: string,
): string | undefined {
  return valueTranslationKey[value];
}
