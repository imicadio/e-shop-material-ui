import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../../layout/layout";
import { ROUTE } from "../../shared/routing";

const Page = ({ product }) => {

    console.log(product)

  return <Container maxWidth="xl">detail Page: </Container>;
};

export async function getStaticPaths() {
  const res = await fetch(process.env.REACT_APP_FIREBASE_DATABASE_URL + ROUTE.PRODUCTS + ".json");
  const products = await res.json();

  console.log(products);

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.REACT_APP_FIREBASE_DATABASE_URL + ROUTE.PRODUCTS_DETAIL + params.id}.json`
  );
  const product = await res.json();

  return { props: { product: product, protected: false, userTypes: [] } };
}

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
