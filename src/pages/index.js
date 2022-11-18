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
  useMediaQuery,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../components/header/header";
import Navigation from "../components/navigation/navigation";

const Page = () => {
  

  return (
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
        <Header />
        <Navigation />
        
      </Box>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      protected: false,
      userTypes: [],
    },
  };
}
