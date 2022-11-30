import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

const CustomCollapse = ({ children, item, breakpoint, headerStyle }) => {
  const breakpointUp = useMediaQuery((theme) => theme.breakpoints.up(breakpoint), {
    defaultMatches: true,
    noSsr: false,
  });
  const [open, setOpen] = useState(true);
  const handleClick = () => setOpen(!open);

  const renderArrow = () => {
    if (item?.children.length > 0 && !breakpointUp) {
      if (open) return <ExpandLess />;
      else return <ExpandMore />;
    }
    return;
  };

  useEffect(() => {
    setOpen(breakpointUp);
  }, [breakpointUp]);

  return (
    <Grid item xs={12}>
      <ListItemButton
        sx={{
          ...headerStyle,
          px: {
            xs: 0,
            md: 2,
          },
        }}
        onClick={!breakpointUp ? handleClick : null}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography type="body2" fontWeight="600">
              {item.title}
            </Typography>
          }
        />
        {renderArrow()}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Grid>
  );
};

export default CustomCollapse;
