import { enableExperimentalFragmentVariables, gql } from "@apollo/client";
import React, { useState } from "react";
import {
  Product,
  Products,
  ShopCartPage,
  ShoppingCart,
  ShoppingCartItems,
} from "../@types";
import ShoppingCard from "../components/ShoppingCard";
import client from "../utils/apollo-client";

export const getServerSideProps = async (props: ShopCartPage) => {
  const { data } = await client.query({
    query: gql`
      query {
        getAllShoppingCartItems {
          _id
          userID
          items {
            productId
            quantity
          }
        }
        getProducts {
          id
          image
          title
          price
        }
      }
    `,
  });
  return {
    props: data,
  };
};

const shoppingcart = (props: ShopCartPage) => {
  const getPrice = () => {
    const arr2 = props.getAllShoppingCartItems.map(
      (element) => element.items.productId
    );
    const filter2 = props.getProducts.filter((element: Product) =>
      arr2.includes(element.id)
    );
    const price = filter2
      .map((element: Product) => {
        return element.price;
      })
      .reduce((a: number, b: number) => a + b, 0);
    return price;
  };

  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
          </div>

          {props.getAllShoppingCartItems &&
            props.getAllShoppingCartItems.map(
              (item: ShoppingCart, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <ShoppingCard
                      ShoppingCartItems={item}
                      Products={props.getProducts}
                    />
                  </React.Fragment>
                );
              }
            )}

          <div className="card mb-4">
            <div className="card-body p-4 d-flex flex-row">
              <p>Price total: {getPrice()}</p>
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
