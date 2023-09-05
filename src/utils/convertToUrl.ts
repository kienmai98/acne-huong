export const hashVideoTitleToUrl = (title: string): string =>
  title.toLowerCase().split(' ').join('-')
