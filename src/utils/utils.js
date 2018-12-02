import { createFormatDate } from 'windlike-utils/dist/date';

export const formatDate = createFormatDate('YYYY-MM-DD hh:mm:ss');

export function createMarkup(html) {
  return { __html: html };
}