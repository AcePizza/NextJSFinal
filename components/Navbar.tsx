import { useRouter } from "next/router";
import React from "react";
import { shopIcon } from "../utils/bootstrapIcons";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

  const toggleActive = () => {
    console.log(router.pathname);
    let setValue: string = "";
    if (router.pathname === "/") {
      setValue = "nav-link";
    } else if (router.pathname === "/mongodb") {
      setValue = "nav-link";
    } else {
      setValue = "nav-link";
    }
    // switch (router.pathname) {
    //   case "/":
    //     return "nav-link active";
    //   case "/mongodb":
    //     return "nav-link active";
    //   default:
    //     return "nav-link";
    // }
    return setValue;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              {shopIcon}
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={toggleActive()} aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={toggleActive()} href="/mongodb">
                MongoDB
              </a>
            </li>
            <li className="nav-item">
              <a className={toggleActive()} href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
