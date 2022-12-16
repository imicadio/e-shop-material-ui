import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { SidebarLayout } from "../../layout/sidebar-layout";
import CartSidebar from "../../components/cart/cart-sidebar";

const Page = () => (
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
          Test
        </SidebarLayout>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
