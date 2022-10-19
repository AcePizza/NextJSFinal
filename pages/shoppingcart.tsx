import React, { useState } from "react";
import { minusIcon, plusIcon, trashIcon } from "../utils/bootstrapIcons";

type Props = {
  one: number;
  two: string;
};

export const getServerSideProps = async (props: Props) => {
  return {
    props: {
      one: "10",
      two: "String",
    },
  };
};

const shoppingcart = (props: Props) => {
  const [amount, setAmount] = useState(1);
  console.log("props", props);
  return (
    <div>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>

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
    </div>
  );
};

export default shoppingcart;
