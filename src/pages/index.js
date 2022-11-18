import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  Button,
  Icon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { AuthGuard } from "../components/auth-guard";

const Page = () => (
  <>
    <Head>
      <title>Homepage</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.lightGray",
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="body1"
            component="p"
            align="center"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            DISCOUNT 20% CODE: MAJKEL20
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ py: 3, justifyContent: "space-between" }}>
          <Grid item xs="auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1280px-Coca-Cola_logo.svg.png"
              alt="material ui logo"
              style={{
                maxHeight: "50px",
              }}
            />
          </Grid>
          <Grid item md xs={12} order={{ xs: 3, md: 2 }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                width: {
                  xs: "100%",
                  lg: "85%",
                },
                margin: "0 auto",
              }}
            >
              <FormControl fullWidth>
                <OutlinedInput placeholder="Please enter text" />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  md: {
                    display: "block",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  Search
                </Typography>
                <SearchIcon
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                />
              </Button>
            </Box>
          </Grid>
          <Grid item order={{ xs: 2, md: 3 }}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Box>
                <Typography variant="body1" component="p">
                  You don't have an account?
                </Typography>
                <Typography variant="body1" align="right" component="p" sx={{ fontWeight: "bold" }}>
                  Join to us!{" "}
                  <NextLink href="/sign-in" passHref>
                    Register
                  </NextLink>
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  marginLeft: "20px",
                }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Page;

export async function getStaticProps() {
  return {
    props: {
      protected: false,
      userTypes: [],
    },
  };
}
