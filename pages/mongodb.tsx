import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { Props } from "../@types";
import React from "react";
import MongoCard from "../components/MongoCard";

export const getServerSideProps = async (props: Props) => {
  const data = await fetch("http://localhost:3000/api/hello");
  const res = await data.json();

  return { props: { res } };
};

type StatusAlert = {
  status?: string;
  text?: string;
};

const mongodb = (props: Props) => {
  console.log("props :>> ", props);
  const statusAlert = <Status, Text>(status?: Status, text?: Text) => {
    switch (status) {
      case "success":
        return (
          <div className="alert alert-success">
            <strong>Success!</strong> {`${text} is working as expected`}
          </div>
        );
      case "warning":
        return (
          <div className="alert alert-warning">
            <strong>Warning!</strong>
            {`${text} might need
            attention.`}
          </div>
        );
      case "danger":
        return (
          <div className="alert alert-danger">
            <strong>Danger!</strong> Indicates a dangerous or potentially
            negative action.
          </div>
        );
    }
  };

  return (
    <div className="container">
      <h4>MongoDB status page</h4>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          <div className="col">{statusAlert("success")}</div>
          <div className="col">{statusAlert("success")}</div>
          <div className="col">{statusAlert("success")}</div>
          <div className="col">{statusAlert("success")}</div>
        </div>
      </div>
    </div>
  );
};

export default mongodb;
