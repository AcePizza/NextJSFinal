import { QueryDataOptions } from "@apollo/client";
import { removeFragmentSpreadFromDocument } from "@apollo/client/utilities";
import { gql } from "apollo-server-micro";
import { resolveObjectURL } from "buffer";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { resourceLimits } from "worker_threads";
import { Product } from "../../@types";
import client from "../../utils/apollo-client";

export const RouteParams = () => {
  const route = useRouter();
  return { params: route.query };
};

type Params = {
  query: {
    id: string;
  };
};

export const getServerSideProps = async (params: Params) => {
  const proID = Number(params.query.id);
  console.log("proID :>> ", typeof proID);
  const { data } = await client.query({
    query: gql`
      query Products {
        getProduct(id: ${proID}) {
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
  const propsData = {
    id: data.getProduct.id,
    title: data.getProduct.title,
    price: data.getProduct.price,
    description: data.getProduct.description,
    category: data.getProduct.category,
    image: data.getProduct.image,
    rating: {
      rate: data.getProduct.rating.rate,
      count: data.getProduct.rating.count,
    },
  };
  console.log("propsData :>> ", propsData);
  return {
    props: propsData,
  };
};

const Details = (props: Product) => {
  console.log("props :>> ", props);
  return (
    <div className="container">
      <h3>Here is the details page</h3>
      <div className="col-lg-8 border p-3 main-section bg-white">
        <div className="row m-0">
          <div className="col-lg-4 left-side-product-box pb-3">
            <img
              src={props.image}
              height={"auto"}
              width={"330px"}
              className="border p-3"
            />
          </div>
          <div className="col-lg-8">
            <div className="right-side-pro-detail border p-3 m-0">
              <div className="row">
                <div className="col-lg-12">
                  <span>{props.title}</span>
                  <p className="m-0 p-0">{props.category}</p>
                </div>
                <div className="col-lg-12">
                  <p className="m-0 p-0 price-pro">${props.price}</p>
                  <hr className="p-0 m-0" />
                </div>
                <div className="col-lg-12 pt-2">
                  <h5>Product Detail</h5>
                  <span>{props.description}</span>
                  <hr className="m-0 pt-2 mt-2" />
                </div>

                <div className="col-lg-12">
                  <h6>Quantity :</h6>
                  <input
                    type="number"
                    className="form-control text-center w-100"
                    defaultValue="1"
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="row">
                    <div className="col-lg-6 pb-2">
                      <a href="#" className="btn btn-danger w-100">
                        Add To Cart
                      </a>
                    </div>
                    <div className="col-lg-6">
                      <a href="#" className="btn btn-success w-100">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
