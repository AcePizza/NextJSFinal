import React from "react";
import { trashIcon } from "../utils/bootstrapIcons";

type Props = {};

const DeleteButton = () => {
  const deleteButtonHandler = () => {
    console.log("Clicky click");
  };

  return (
    <>
      <button
        onClick={deleteButtonHandler}
        type="button"
        className="btn btn-default"
        aria-label="Left Align"
      >
        <span className="fa fa-trash-o fa-lg" aria-hidden="true">
          {trashIcon}
        </span>
      </button>
    </>
  );
};

export default DeleteButton;
