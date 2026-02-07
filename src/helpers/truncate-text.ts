// if string is greater than n we want to cut the last

export const truncateText = (text: string, n: number) => {
  if(text.length === 0) return '';

  return text.length < n ? text : text.substring(0, n) + '...'
}
