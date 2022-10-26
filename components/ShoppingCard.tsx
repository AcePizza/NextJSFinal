import React, { useEffect, useState } from "react";
import {
  Product,
  ShopCartPage,
  ShoppingCart,
  ShoppingCartProps,
} from "../@types";
import { minusIcon, plusIcon, trashIcon } from "../utils/bootstrapIcons";
import DeleteButton from "./DeleteButton";

type Prod = {
  products: {
    products: { id: number; title: string; price: number; image: string };
  };
};

type Cart = {
  shoppingCart: {
    _id: string;
    userID: string;
    items: [{ quantity: number; productId: string }];
  };
};

const ShoppingCard = (props: ShoppingCartProps) => {
  const [amount, setAmount] = useState(props.ShoppingCartItems.items.quantity);

  const shopptingCartItems = props.Products.find((item: Product) => {
    return item.id === props.ShoppingCartItems.items.productId;
  });

  return (
    <React.Fragment>
      <div className="card rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-2">
              <img
                src={shopptingCartItems.image}
                className="img-fluid rounded-3"
                alt={shopptingCartItems.title}
              />
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <p className="lead fw-normal mb-2">{shopptingCartItems.title}</p>
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
              <h5 className="mb-0">${shopptingCartItems.price}</h5>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
              <DeleteButton />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShoppingCard;
