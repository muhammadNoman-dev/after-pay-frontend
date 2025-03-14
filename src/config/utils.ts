export const updateState = (
  list: any,
  data: any,
  checkOn: string
): [any[], boolean] => {
  if (Array.isArray(data)) {
    let newStateAdded = false;
    let pushNewList: any[] = [...list];
    data.forEach((d) => {
      const [updated, newAdded] = update(pushNewList, d, checkOn);
      newStateAdded = newStateAdded || newAdded;
      pushNewList = [...updated];
    });
    return [pushNewList, newStateAdded];
  } else {
    const [updated, newAdded] = update(list, { ...data }, checkOn);
    return [updated, newAdded];
  }
};

const update = (list: any, data: any, checkOn: string): [any[], boolean] => {
  const index = list.findIndex(
    (ls: { [key: string]: string }) => ls[checkOn] === data[checkOn]
  );
  if (index === -1) {
    return [[...list, { ...data }], true];
  } else {
    const newList = [...list];
    newList.splice(index, 1, { ...data } as never);
    return [newList as any[], false];
  }
};
