import React from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import { Props } from "../@types";
import GrapQLCard from "../components/GrapQLCard";

export async function getServerSideProps() {
  const { data } = await client.query({
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
  return {
    props: data,
  };
}

const apollogql = (props: Props) => {
  return (
    <div className="container">
      <h3>This is an Apollo fetch</h3>
      {props.getProducts &&
        props.getProducts.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <GrapQLCard
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                rating={{
                  rate: product.rating.rate,
                  count: product.rating.count,
                }}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default apollogql;
