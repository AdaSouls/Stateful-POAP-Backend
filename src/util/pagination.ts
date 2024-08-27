const pagination = (
  paginationNumber: number = 1,
  paginationLimit: number = 20
) => {
  const paginationOffset = paginationNumber * paginationLimit - paginationLimit;
  return { paginationOffset, paginationLimit };
};

export default pagination;
