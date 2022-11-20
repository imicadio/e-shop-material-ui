import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { NavItem } from "../../components/nav-item";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/listProductSlice";
import {
  FILTER_BY_CATEGORIES,
  FILTER_BY_SEARCH,
  selectBrands,
  selectCategories,
  selectMaxPrice,
  selectMinPrice,
  selectSearch,
} from "../../redux/slice/filterSlice";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
];

const selectedFilterObject = {
  brand: [],
  category: [],
};

const ProductsSidebar = () => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const dispatch = useDispatch();

  const [showResetBtn, setShowResetBtn] = useState(false);
  const [price, setPrice] = useState([0, 10]);
  const [selectedFilter, setSelectedFilter] = useState(selectedFilterObject);

  const products = useSelector(selectProducts);
  const sliderMin = useSelector(selectMinPrice);
  const sliderMax = useSelector(selectMaxPrice);
  const search = useSelector(selectSearch);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const handleSelect = (name, value) => {
    setSelectedFilter({
      ...selectedFilter,
      [name]: value,
    });
  };

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleClear = () => {
    setSelectedFilter({ ...selectedFilterObject });
    setPrice([sliderMin, sliderMax]);
    setShowResetBtn(false);
  };

  const handleSearch = (event) => {
    dispatch(FILTER_BY_SEARCH({ search: event.target.value }));
  };

  const handleClearSearch = () => {
    dispatch(FILTER_BY_SEARCH({ search: "" }));
  };

  useEffect(() => {
    if (!isNaN(sliderMin) && sliderMin && !isNaN(sliderMax) && sliderMax)
      setPrice([sliderMin, sliderMax]);
  }, [sliderMax, sliderMin]);

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORIES({ products, filters: selectedFilter, price }));
    const hasFilter = Object.values(selectedFilter).some((x) => x.length > 0);

    if (hasFilter) setShowResetBtn(true);
    else if (price[0] !== sliderMin || price[1] !== sliderMax) setShowResetBtn(true);
    else setShowResetBtn(false);
  }, [selectedFilter, price, search]);

  //   useEffect(
  //     () => {
  //       if (!router.isReady) {
  //         return;
  //       }

  //       if (open) {
  //         onClose?.();
  //       }
  //     },
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [router.asPath]
  //   );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            backgroundColor: "primary.lightGray",
            p: 2,
          }}
        >
          Filter
        </Typography>
        <Divider
          sx={{
            borderColor: "primary.middleBlack",
            mb: 2,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
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
            backgroundColor: "transparent",
            width: 350,
            position: "relative",
            border: 0,
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
      // onClose={onClose}
      // open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default ProductsSidebar;
