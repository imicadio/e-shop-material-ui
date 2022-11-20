import React from "react";
import { MainLayout } from "../../layout/layout";
import Breadcrumb from "../../components/breadcrumbs/breadcrumb";
import { SidebarLayout } from "../../layout/sidebar-layout";
import ProductsSidebar from "./products-sidebar";

const Page = () => {
  return (
    <>
      <Breadcrumb />
      <h1>Products</h1>
    </>
  );
};

Page.getLayout = (page) => (
  <MainLayout>
    <SidebarLayout sidebar={<ProductsSidebar />}>{page}</SidebarLayout>
  </MainLayout>
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
