import Head from "next/head";
import NextLink from "next/link";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../components/header/header";
import Navigation from "../components/navigation/navigation";
import { useCallback, useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);

  const setActiveMenu = useCallback(val => {
    setOpen(val)
  }, [setOpen])

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
        <Header open={open} setActiveMenu={setActiveMenu} />
        <Navigation open={open} setActiveMenu={setActiveMenu} />
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
