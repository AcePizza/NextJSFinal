import { enableExperimentalFragmentVariables, gql } from "@apollo/client";
import React, { useState } from "react";
import { ShopCartPage, ShoppingCart } from "../@types";
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
  console.log("props :>> ", props.getAllShoppingCartItems[0].items.productId);

  let arr1 = [];
  let filter1 = [];

  props.getAllShoppingCartItems.map((element) => {
    arr1.push(element.items.productId);
  });

  const arr2 = props.getAllShoppingCartItems.map((element) => {
    return element.items.productId;
  });

  const filter2 = props.getProducts.map((element) => {
    return arr2.includes(element.id);
  });

  props.getProducts.map((element) => {
    // console.log("element", element.id);
    if (arr1.includes(element.id)) {
      filter1.push(element);
    }
  });

  console.log("arr1", arr1);
  console.log("arr2 :>> ", arr2);
  console.log("filter1 :>> ", filter2);

  // const test = props.getProducts.filter((item) => {
  //   return !props.getAllShoppingCartItems.items.productId.includes(item.id);
  // });

  // console.log("test", test);

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
