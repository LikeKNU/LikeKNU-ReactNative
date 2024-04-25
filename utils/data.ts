export const flatMapRemoveDuplicate = <T>(data: T[] | undefined): T[] => {
  return data ? [...new Set(data.flatMap(value => value).map(item => JSON.stringify(item)))].map(json => JSON.parse(json)) : [];
}
