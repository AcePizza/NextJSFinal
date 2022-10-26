import React from "react";
import { trashIcon } from "../utils/bootstrapIcons";

const DeleteButton = () => {
  return (
    <>
      <a href="#!" className="text-danger">
        {trashIcon}
      </a>
    </>
  );
};

export default DeleteButton;
