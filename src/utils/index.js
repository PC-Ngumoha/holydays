export function getFormattedDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: '2-digit',
  }).format(new Date(dateString));
}
