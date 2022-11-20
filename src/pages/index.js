import { Container } from "@mui/material";
import React from "react";
import { MainLayout } from "../layout/layout";

const Page = () => {
  return <Container maxWidth="xl">test main layout</Container>;
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
