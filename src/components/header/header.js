import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth-context";
import Navigation from "../navigation/navigation";
import HeaderContent from "./header-content/header-content";
import HeaderTopBar from "./header-topbar/header-topbar";
import { STORE_PRODUCTS } from '../../redux/slice/listProductSlice';
import { FILTERS_STORE } from '../../redux/slice/filterSlice';
import { useProducts } from "../../hooks/useProducts";
import { useDispatch } from "react-redux";


const Header = ({ open, setActiveMenu }) => {
  const auth = useContext(AuthContext);
  const [isLoading, products] = useProducts();
  const dispatch = useDispatch();

  useEffect(() => {
    const brands = [];
    const categories = [];

    products.map((product) =>
      brands.includes(product.brand.toUpperCase())
        ? false
        : brands.push(product.brand.toUpperCase())
    );

    products.map((product) =>
      categories.includes(product.category.toUpperCase())
        ? false
        : categories.push(product.category.toUpperCase())
    );

    const prices = [];
    products.map((item) => prices.push(parseInt(item.price)));

    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

    dispatch(
      STORE_PRODUCTS({
        products: products,
      })
    );

    dispatch(
      FILTERS_STORE({
        categories: categories,
        brands: brands,
        minPrice: minPrice,
        maxPrice: maxPrice,
      })
    );
  }, [products]);

  const renderTopBar = auth.isAuthenticated ? <HeaderTopBar /> : null;

  return (
    <Box component="header">
      {renderTopBar}
      <HeaderContent open={open} setActiveMenu={setActiveMenu} />
      <Navigation open={open} setActiveMenu={setActiveMenu} />
    </Box>
  );
};

export default Header;
