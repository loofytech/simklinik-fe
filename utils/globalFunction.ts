export const truncate = (input: string) => {
  if (input.length > 12) {
    return input.substring(0, 12) + '...';
  }
  return input;
}