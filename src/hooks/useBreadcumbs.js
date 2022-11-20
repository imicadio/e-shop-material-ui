import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ROUTE } from "../shared/routing";

const HOME = {
  href: ROUTE.HOME,
  isCurrent: false,
  label: "Home",
};

export const useBreadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    breadcrumbs.unshift(HOME);

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return [breadcrumbs];
};
