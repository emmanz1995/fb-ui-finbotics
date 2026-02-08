export const truncateText = (text: any, n: number): string => {
  if (text.length === 0) return '';

  return text.length > n ? text.substring(0, n - 1) + '...' : text;
};
