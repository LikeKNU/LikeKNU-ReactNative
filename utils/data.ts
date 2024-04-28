export const flatMapRemoveDuplicate = <T>(data: T[] | undefined): T[] => {
  return data ? [...new Set(data.flatMap(value => value).map(item => JSON.stringify(item)))].map(json => JSON.parse(json)) : [];
};

export const sortPinElementTop = <T>(list: T[], predicate: (arg: T) => boolean): T[] => {
  const cloneList = list.slice();
  const index = cloneList.findIndex(predicate);
  if (index !== -1) {
    const [element] = cloneList.splice(index, 1);
    cloneList.unshift(element);
  }
  return cloneList;
};
