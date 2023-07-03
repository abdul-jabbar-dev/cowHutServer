const pickQuery = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
export const paginationCalculate = ({
  limit,
  page,
}: {
  limit?: string | number;
  page?: string | number;
  skip?: string | number;
}): {
  limit: number;
  page: number;
  skip: number;
} => {
  console.log(Number(limit) || 1);
  let glimit = Number(limit) || 5;
  let gpage = Number(page) || 1;
  let skip = (gpage - 1) * glimit;
  return {
    limit: glimit,
    page: gpage,
    skip,
  };
};

export default pickQuery;
