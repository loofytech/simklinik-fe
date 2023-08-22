export const truncate = (input: string) => {
  if (input.length > 12) {
    return input.substring(0, 12) + '...';
  }
  return input;
}

export const formatIDR = (param: string | number) => {
  let format = param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return format;
}