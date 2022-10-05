import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { Props, Data } from "../@types";
import React from "react";
import MongoCard from "../components/MongoCard";

export const getServerSideProps = async (props: Props) => {
  const res = await fetch("http://localhost:3000/api/products");
  const data: Data = await res.json();
  return { props: { data } };
};

const mongodb = (props: Props) => {
  return (
    <div className="container">
      <h4>MongoDB data rendered below:</h4>

      {props.data &&
        props.data.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <MongoCard
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

export default mongodb;
