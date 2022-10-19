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
      <h4>MongoDB status page</h4>
    </div>
  );
};

export default mongodb;
