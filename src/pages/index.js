import React from "react";
import { MainLayout } from "../layout/layout";

const Page = () => {
  return <h2>test main layout</h2>;
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
