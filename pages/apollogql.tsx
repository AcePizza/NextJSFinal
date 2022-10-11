import React from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import { Props } from "../@types";

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
    props: { data },
  };
}

const apollogql = (props: Props) => {
  return (
    <div className="container">
      <h3>This is an Apollo fetch</h3>
      {props.getProducts &&
        props.getProducts.map((element, index) => {
          return (
            <React.Fragment key={index}>
              <p>{element.title}</p>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default apollogql;
