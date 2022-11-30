import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ROUTE } from "../../shared/routing";
import BreadcrumbItem from "./breadcrumb-item";
import { useBreadcrumbs } from "../../hooks/useBreadcumbs";

const Breadcrumb = () => {
  const [breadcrumbs] = useBreadcrumbs();

  if (!breadcrumbs) return;

  const renderBreadcrumbItem =
    breadcrumbs.length > 0
      ? breadcrumbs.map((item, id) => (
          <BreadcrumbItem key={id} id={id} {...item} isLast={breadcrumbs.length} />
        ))
      : null;

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {renderBreadcrumbItem}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
