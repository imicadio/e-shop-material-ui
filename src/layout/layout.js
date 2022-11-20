import Head from "next/head";
import { Box } from "@mui/material";
import Header from "../components/header/header";
import Navigation from "../components/navigation/navigation";
import { useCallback, useState } from "react";
import Footer from "../components/footer/footer";

export const MainLayout = (props) => {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const setActiveMenu = useCallback(
    (val) => {
      setOpen(val);
    },
    [setOpen]
  );

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Header open={open} setActiveMenu={setActiveMenu} />
        
        {children}
        <Footer />
      </Box>
    </>
  );
};
