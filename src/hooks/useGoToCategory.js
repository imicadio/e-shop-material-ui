import { useRouter } from "next/router";
import { ROUTE } from "../shared/routing";

export const useGoToCategory = (category) => {
  const link = ROUTE.PRODUCTS + "?" + "category=" + category;

  return link;
};
