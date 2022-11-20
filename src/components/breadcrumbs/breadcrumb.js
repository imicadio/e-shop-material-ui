import { Breadcrumbs } from "@mui/material";
import { Fragment, Children } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ROUTE } from "../../shared/routing";
import BreadcrumbItem from "./breadcrumb-item";

const Breadcrumb = ({ breadcrumbs }) => {
  // const childrenArray = Children.toArray(children);

  console.log(breadcrumbs);

  const tmpBreacrumbs = [
    {
      href: ROUTE.HOME,
      isCurrent: false,
      label: "Home",
    },
    ...breadcrumbs,
  ];

  console.log(tmpBreacrumbs);

  const renderBreadcrumbItem =
    tmpBreacrumbs.length > 0
      ? tmpBreacrumbs.map((item, id) => (
          <BreadcrumbItem key={id} id={id} {...item} isLast={breadcrumbs.length} />
        ))
      : null;

  // <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
  //     MUI
  //   </Link>,
  //   <Link
  //     underline="hover"
  //     key="2"
  //     color="inherit"
  //     href="/material-ui/getting-started/installation/"
  //     onClick={handleClick}
  //   >
  //     Core
  //   </Link>,
  //   <Typography key="3" color="text.primary">
  //     Breadcrumb
  //   </Typography>,

  // const childrenWtihSeperator = childrenArray.map((child, index) => {
  //   if (index !== childrenArray.length - 1) {
  //     return (
  //       <Fragment key={index}>
  //         {child}
  //         <span>/</span>
  //       </Fragment>
  //     );
  //   }
  //   return child;
  // });

  // <BreadcrumbItem isCurrent={router.pathname === "/"} href="/">
  //         Home
  //       </BreadcrumbItem>
  //       {breadcrumbs &&
  //         breadcrumbs.map((breadcrumb) => (
  //           <BreadcrumbItem
  //             key={breadcrumb.href}
  //             href={breadcrumb.href}
  //             isCurrent={breadcrumb.isCurrent}
  //           >
  //             {breadcrumb.label}
  //           </BreadcrumbItem>
  //         ))}

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {renderBreadcrumbItem}
    </Breadcrumbs>
  );

  // return (
  //   <nav className="" aria-label="breadcrumb">
  //     <ol className="">{childrenWtihSeperator}</ol>
  //   </nav>
  // );
};

export default Breadcrumb;
