import { Typography } from "@mui/material";
import NextLink from "next/link";

const BreadcrumbItem = ({ href, isCurrent, label, id }) => {
  if (isCurrent) {
    return (
      <Typography key={id} color="text.primary">
        {label}
      </Typography>
    );
  }

  return (
    <NextLink href={href} passHref underline="hover" key={id} color="inherit">
      {label}
    </NextLink>
  );
};

export default BreadcrumbItem;
