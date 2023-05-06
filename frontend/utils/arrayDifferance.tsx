export const diff = (
  searchArr: UserProps[],
  selllectedArr: UserProps[]
): UserProps[] => {
  const aset = new Set(selllectedArr);
  const diff = searchArr.filter((u) => !aset.has(u));

  return diff;
};
