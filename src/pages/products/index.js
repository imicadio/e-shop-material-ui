import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/layout";
import Breadcrumb from "../../components/breadcrumbs/breadcrumb";
import { SidebarLayout } from "../../layout/sidebar-layout";
import ProductsSidebar from "../../components/product-listing/products-sidebar";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  selectSearch,
} from "../../redux/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListingHeader from "../../components/product-listing/product-listing-header";
import ProductListing from "../../components/product-listing/product-listing";
import { floorDown } from "../../helpers/numbers";
import { Pagination } from "@mui/material";

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const [viewList, setViewList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null);

  const filteredProducts = useSelector(selectFilteredProducts);
  const search = useSelector(selectSearch);

  const setListView = (value) => setViewList(value);
  const handleSearch = (event) => {
    setCurrentPage(1);
    dispatch(FILTER_BY_SEARCH({ search: event.target.value }));
  };
  const handleSetItemsPerPage = (value) => {
    setItemsPerPage(value);
    const tmpTotalPages = floorDown(filteredProducts.length / value);
    tmpTotalPages > 1
      ? setTotalPages(floorDown(filteredProducts.length / value))
      : setTotalPages(1);
  };
  const handleCurrentPage = (value) => setCurrentPage(value);
  const handlePagination = (event, value) => setCurrentPage(value);

  const handleClearSearch = () => {
    dispatch(FILTER_BY_SEARCH({ search: "" }));
  };

  useEffect(() => {
    const tmpTotalPages = floorDown(filteredProducts.length / itemsPerPage);
    tmpTotalPages > 1
      ? setTotalPages(floorDown(filteredProducts.length / itemsPerPage))
      : setTotalPages(1);
  }, [filteredProducts]);

  return (
    <SidebarLayout
      sidebar={<ProductsSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />}
    >
      <Breadcrumb />
      <ProductListingHeader
        setListView={setListView}
        handleSearch={handleSearch}
        handleItemsPerPage={handleSetItemsPerPage}
        handleCurrentPage={handleCurrentPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
        onSidebarOpen={() => setSidebarOpen(true)}
        handleClearSearch={handleClearSearch}
      />
      <ProductListing
        products={filteredProducts}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        viewList={viewList}
      />
      <Pagination
        onChange={handlePagination}
        count={totalPages ? totalPages : 0}
        color="primary"
        sx={{
          mt: 3,
          marginLeft: "auto",
          ul: {
            "& .MuiPaginationItem-root": {
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "white",
              },
            },
          },
        }}
      />
    </SidebarLayout>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;

export async function getStaticProps() {
  return {
    props: {
      protected: false,
      userTypes: [],
    },
  };
}
