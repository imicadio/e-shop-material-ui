import { Typography } from "@mui/material";
import React from "react";
import NextLink from "next/link";

const CustomLink = ({ href, children, text }) => {
  const renderText = text ? (
    <Typography
      color="textPrimary"
      variant="body1"
      sx={{
        "&:hover": {
          color: "#b7181d",
        },
      }}
    >
      {text}
    </Typography>
  ) : (
    <>{ children }</>
  );

  return (
    <NextLink href={href} passHref>
      <a style={{ cursor: "pointer" }}>{renderText}</a>
    </NextLink>
  );
};

export default CustomLink;
