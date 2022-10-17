import { gql } from "apollo-server-micro";
import React from "react";
import { Product } from "../../@types";
import client from "../../utils/apollo-client";

type Products = Product[];

export const getStaticPaths = async <Type,>(params: Type) => {
  const { data } = await client.query<Products>({
    query: gql`
      query Products {
        getProducts {
          _id
          id
          title
          category
          price
          description
          image
          rating {
            rate
            count
          }
        }
      }
    `,
  });
  const paths = data.map((product: Product) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async <Type,>(context: Type) => {
  console.log("context", context);
};

const Details = <Type,>(props: Type) => {
  return (
    <div>
      <h3>Here is the details page</h3>
    </div>
  );
};

export default Details;
