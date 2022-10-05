import React from "react";
import { Data, Props } from "../@types";

const MongoCard = (props: Data) => {
  return (
    <>
      <div className="card" style={{ width: "auto" }}>
        <img
          src={props.image}
          className="card-img-top"
          alt={props.title}
          width="500px"
          height="500px"
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
      <br />
    </>
  );
};

export default MongoCard;
