import { ROUTE } from "../shared/routing";

export const useGoToProductDetail = (id) => {
  const link = ROUTE.PRODUCTS_DETAIL + new String(id - 1);

  return link;
};
