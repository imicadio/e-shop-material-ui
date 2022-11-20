import { Container } from "@mui/material";
import React from "react";
import { MainLayout } from "../layout/layout";
import Breadcrumb from "../components/breadcrumbs/breadcrumb";
import BreadcrumbItem from "../components/breadcrumbs/breadcrumb-item";
import { useRouter } from "next/router";

const Page = () => {

  return (
    <Container maxWidth="xl">
      <Breadcrumb />        
      <h1>Products</h1>
    </Container>
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
