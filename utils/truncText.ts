export const truncText = (text: string, length: number) => {
  if (length < 0) throw new Error();
  if (text.length <= length) {
    return text;
  }

  const truncText = text.slice(0, length);
  const lastSpace = text.lastIndexOf(' ');

  return truncText.slice(0, lastSpace) + '...';
}