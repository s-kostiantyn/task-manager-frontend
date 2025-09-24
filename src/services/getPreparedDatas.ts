import { FilterParams } from "../types/FilterParams";

export function getPreparedDatas<T extends Array<any>, D>(
  datas: T,
  { filterBy, sortBy }: FilterParams<D>
) {
  let preparedDatas = [...datas];

  if (filterBy) {
    preparedDatas = preparedDatas.filter((data) => data.status === filterBy);
  }

  if (sortBy) {
    preparedDatas.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime();
    });
  }

  return preparedDatas;
}
