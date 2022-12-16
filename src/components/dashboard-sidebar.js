import { useContext, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { ROUTE } from "../shared/routing";
import { AuthContext } from "../contexts/auth-context";

const items = [
  {
    href: ROUTE.DASHBOARD,
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    guard: [],
  },
  {
    href: ROUTE.DASHBOARD + '/cart',
    icon: <ChartBarIcon fontSize="small" />,
    title: "Cart",
    guard: ["user"],
  },
  {
    href: ROUTE.DASHBOARD + "/customers",
    icon: <UsersIcon fontSize="small" />,
    title: "Customers",
    guard: [],
  },
  {
    href: ROUTE.DASHBOARD + "/newsletters",
    icon: <UsersIcon fontSize="small" />,
    title: "Newslatters",
    guard: ["admin"],
  },
  {
    href: ROUTE.DASHBOARD + "/products",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Orders",
    guard: [],
  },
  {
    href: ROUTE.DASHBOARD + "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
    guard: [],
  },
  {
    href: ROUTE.DASHBOARD + "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
    guard: [],
  },
];

export const DashboardSidebar = (props) => {
  const auth = useContext(AuthContext);
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const renderNavigationMobile = items.map((item) => {
    if (item.guard.length !== 0) {
      return auth.isAuthenticated && item.guard.includes(auth.user.role) ? (
        <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
      ) : null;
    }

    return <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />;
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>{renderNavigationMobile}</Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 350,
          position: "relative",
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
