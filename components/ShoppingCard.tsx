import React, { useEffect, useState } from "react";
import { ShoppingCart } from "../@types";
import { minusIcon, plusIcon, trashIcon } from "../utils/bootstrapIcons";

const ShoppingCard = (props: ShoppingCart) => {
  console.log("props", props);
  const [amount, setAmount] = useState(1);

  const modifyAmount = () => {
    if (amount > 1) {
      setAmount(1);
    }
  };

  return (
    <React.Fragment>
      <div className="card rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                className="img-fluid rounded-3"
                alt="Cotton T-shirt"
              />
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <p className="lead fw-normal mb-2">Basic T-shirt</p>
              <p>
                <span className="text-muted">Size: </span>M{" "}
                <span className="text-muted">Color: </span>Grey
              </p>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button
                className="btn btn-link px-2"
                onClick={() => {
                  setAmount(amount - 1);
                }}
              >
                {minusIcon}
              </button>

              <p>{amount}</p>

              <button
                className="btn btn-link px-2"
                onClick={() => {
                  setAmount(amount + 1);
                }}
              >
                {plusIcon}
              </button>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 className="mb-0">$499.00</h5>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
              <a href="#!" className="text-danger">
                {trashIcon}
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShoppingCard;
