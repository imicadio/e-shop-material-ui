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

const FooterCollapse = ({ item }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const [open, setOpen] = useState(true);
  const handleClick = () => setOpen(!open);

  const renderChildren =
    item.children.length > 0
      ? item.children.map((child, id) => (
          <List key={id} component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={child.title} />
            </ListItemButton>
          </List>
        ))
      : null;

  const renderArrow = () => {
    if (item?.children.length > 0 && !lgUp) {
      if (open) return <ExpandLess />;
      else return <ExpandMore />;
    }
    return;
  };

  useEffect(() => {
    console.log(lgUp);
    setOpen(lgUp);
  }, [lgUp]);

  return (
    <Grid item xs={12}>
      <ListItemButton
        sx={{
          px: {
            xs: 0,
            md: 2,
          },
        }}
        onClick={!lgUp ? handleClick : null}
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
        {renderChildren}
      </Collapse>
    </Grid>
  );
};

export default FooterCollapse;
