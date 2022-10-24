import { gql } from "@apollo/client";
import React from "react";
import useSWR from "swr";
import { Product } from "../@types";
import client from "../utils/apollo-client";

const UpdateShoppingCart = (props: Product) => {
  const productID = props.id;

  const addToShoppingCart = async () => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation {
          addToShoppingCart(
            userId: "Stian"
            quantity: 1
            productId: ${productID}
          ) {
            _id
            userID
            items {
              productId
              quantity
            }
          }
        }
      `,
    });
    console.log("data :>> ", data);
  };

  return (
    <>
      <button
        onClick={addToShoppingCart}
        className="btn btn-warning btn-sm"
        type="button"
      >
        Buy now
      </button>
    </>
  );
};

export default UpdateShoppingCart;
