import { gql } from "@apollo/client";
import React, { useState } from "react";
import { ShoppingCart } from "../@types";
import ShoppingCard from "../components/ShoppingCard";
import client from "../utils/apollo-client";

type Props = {
  getAllShoppingCartItems: [ShoppingCart];
};

export const getServerSideProps = async (props: Props) => {
  const { data } = await client.query({
    query: gql`
      query Products {
        getAllShoppingCartItems {
          userID
          items {
            productId
            quantity
          }
        }
      }
    `,
  });
  return {
    props: data,
  };
};

const shoppingcart = (props: Props) => {
  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
          </div>

          {props.getAllShoppingCartItems &&
            props.getAllShoppingCartItems.map((item, index: number) => {
              return (
                <React.Fragment key={index}>
                  <ShoppingCard
                    _id={item._id}
                    userID={item.userID}
                    items={item.items}
                  />
                </React.Fragment>
              );
            })}

          <div className="card mb-4">
            <div className="card-body p-4 d-flex flex-row">
              <p>Price total:</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <button
                type="button"
                className="btn btn-warning btn-block btn-lg"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shoppingcart;
