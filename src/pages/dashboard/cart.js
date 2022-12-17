import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { SidebarLayout } from "../../layout/sidebar-layout";
import CartSidebar from "../../components/cart/cart-sidebar";
import { TableComponent } from "../../components/table/table-component";
import { selectCartItems } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";

const Page = () => {
  const cartItems = useSelector(selectCartItems);

  const tableHeader = ['id', 'brand', 'category', 'price', 'quantity']

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
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Cart
          </Typography>
          <SidebarLayout isMobile sidebar={<CartSidebar />}>
            <TableComponent cartItems={cartItems} tableHeader={tableHeader} />
          </SidebarLayout>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
