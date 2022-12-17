import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { SidebarLayout } from "../../layout/sidebar-layout";
import CartSidebar from "../../components/cart/cart-sidebar";
import { TableComponent } from "../../components/table/table-component";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  REMOVE_FROM_CART,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { useEffect, useState } from "react";
import AlertDialog from "../../components/dialog/dialog";

const Page = () => {
  const dispatch = useDispatch();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const cartItems = useSelector(selectCartItems);
  const [openAlert, setOpenAlert] = useState(false);

  const tableHeader = ["id", "brand", "category", "price", "quantity"];

  const handleOpenAlert = () => setOpenAlert(!openAlert);

  const handleConfirm = (isConfirmed) => {
    if (isConfirmed) {
      setSelectedCustomerIds(() => []);
      cartItems.map((item) => {
        selectedCustomerIds.indexOf(item.id) !== -1
          ? dispatch(REMOVE_FROM_CART({ product: item }))
          : null;
      });
    }
    setOpenAlert(!openAlert);
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  const renderView =
    cartItems.length === 0 ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="h2"
          component="h3"
          sx={{
            color: "lightGray",
          }}
        >
          Your cart is empty.
        </Typography>
      </Box>
    ) : (
      <>
        <CustomerListToolbar
          title={"Cart"}
          handleAlert={handleOpenAlert}
          selected={selectedCustomerIds}
        />
        <SidebarLayout isMobile sidebar={<CartSidebar />}>
          <TableComponent
            cartItems={cartItems}
            tableHeader={tableHeader}
            selectedCustomerIds={selectedCustomerIds}
            setSelectedCustomerIds={setSelectedCustomerIds}
          />
        </SidebarLayout>
      </>
    );

  return (
    <>
      <Head>
        <title>Cart | Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {renderView}
        </Container>
        <AlertDialog openAlert={openAlert} handleConfirm={handleConfirm} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
