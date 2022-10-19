import Link from "next/link";
import React from "react";
import { Product, Products } from "../@types";

const GrapQLCard = (props: Product) => {
  const getRandomPrice = () => {
    return 10.4;
    // const min = Math.ceil(1);
    // const max = Math.floor(100);
    // return Math.floor(Math.random() * (max - min));
  };

  const handleDetailsButton = () => {};

  return (
    <>
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
                <div className="mt-1 mb-1 spec-1">
                  <span>Rating: {props.rating.rate}</span>
                  <span className="dot"></span>
                  <span>Count: {props.rating.count}</span>
                  <span className="dot"></span>
                </div>

                <p className="text-justify text-truncate para mb-0">
                  {props.description}
                  <br />
                  <br />
                </p>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">{props.price}</h4>
                  <span className="strike-text">${getRandomPrice()}</span>
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="d-flex flex-column mt-4">
                  <Link href={"/graphql/" + props.id} key={props.id} passHref>
                    <button className="btn btn-primary btn-sm" type="button">
                      Details
                    </button>
                  </Link>

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
    </>
  );
};

export default GrapQLCard;
