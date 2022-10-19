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
import styles from "../../styles/ProductDetails.module.css";
import Link from "next/link";

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
  return {
    props: propsData,
  };
};

const Details = (props: Product) => {
  // console.log("props :>> ", props);
  return (
    <div className="container">
      <h3>Here is the details page</h3>
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={props.image}
                />
              </div>
              <div className="col-md-6 mt-1">
                <h5>{props.title}</h5>
                <div className="d-flex flex-row">
                  <div className="ratings mr-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <span>{props.category}</span>
                </div>
                <br />
                <p className="text-justify para mb-0">
                  {props.description}
                  <br />
                  <br />
                </p>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">{props.price}</h4>
                  <span className="strike-text">$100</span>
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="d-flex flex-column mt-4">
                  <button className="btn btn-warning btn-sm" type="button">
                    Buy now
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    Add to wishlist
                  </button>
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
