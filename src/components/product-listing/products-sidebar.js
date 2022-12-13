import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { NavItem } from "../nav-item";
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
import Search from "../search/search";
import CustomCollapse from "../collapse/collapse";
import CloseIcon from "@mui/icons-material/Close";

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

const ProductsSidebar = ({ onClose, open }) => {
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

  const handleCheckbox = (e, name) => {
    const value = e.target.value;
    const valueIndex = selectedFilter[name].indexOf(value);

    if (valueIndex >= 0) {
      return handleSelect(
        name,
        selectedFilter[name].filter((element) => element !== value)
      );
    } else {
      return handleSelect(name, [...selectedFilter[name], value]);
    }
  };

  const renderBrands = (
    <FormGroup
      sx={{
        maxHeight: "300px",
        overflowY: "auto",
        flexWrap: "nowrap",
        pl: 2,
      }}
    >
      {brands.map((item, id) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              value={item}
              checked={selectedFilter.brand.includes(item.toUpperCase())}
              onClick={(e) => handleCheckbox(e, "brand")}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );

  const renderCategories = (
    <FormGroup
      sx={{
        maxHeight: "300px",
        overflowY: "auto",
        flexWrap: "nowrap",
        pl: 2,
      }}
    >
      {categories.map((item, id) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              value={item}
              checked={selectedFilter.category.includes(item.toUpperCase())}
              onClick={(e) => handleCheckbox(e, "category")}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );

  const renderCloseIcon = lgUp ? null : (
    <IconButton sx={{ justifyContent: "flex-end", p: 3 }} onClick={onClose}>
      <CloseIcon />
    </IconButton>
  );

  const renderResetFilters = showResetBtn ? (
    <Button endIcon={<CloseIcon />} onClick={handleClear} sx={{
      p: 0,
      '&:hover': {
        background: 'transparent',
        color: 'secondary.main',
        textDecoration: 'underline',
      }
    }}>
      Clear all
    </Button>
  ) : null;

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

  useEffect(() => {    
    const routerParam = router.query;
    
    if(Object.keys(routerParam).length) {
      handleSelect('category', [routerParam.category.toUpperCase()]);
    }
  }, [])

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {renderCloseIcon}
        <Box
          sx={{
            backgroundColor: "primary.lightGray",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Filter
          </Typography>
          {renderResetFilters}
        </Box>
        <Divider
          sx={{
            borderColor: "primary.middleBlack",
            mb: 2,
          }}
        />
        <Box
          px={{
            xs: 2,
            lg: 0,
          }}
        >
          {lgUp ? null : (
            <Search
              wordEntered={search}
              handleSearch={handleSearch}
              handleClear={handleClearSearch}
            />
          )}
          <Box
            sx={{
              backgroundColor: "primary.lightGray",
              mt: 2,
            }}
          >
            <CustomCollapse
              item={{ title: "Brands", children: [1, 2] }}
              headerStyle={{ borderBottom: 1, borderColor: "primary.middleBlack" }}
            >
              {renderBrands}
            </CustomCollapse>
          </Box>

          <Box
            sx={{
              backgroundColor: "primary.lightGray",
              mt: 2,
            }}
          >
            <CustomCollapse
              item={{ title: "Categories", children: [1, 2] }}
              headerStyle={{ borderBottom: 1, borderColor: "primary.middleBlack" }}
            >
              {renderCategories}
            </CustomCollapse>
          </Box>
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
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: "85vw",
          maxWidth: "350px",
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
