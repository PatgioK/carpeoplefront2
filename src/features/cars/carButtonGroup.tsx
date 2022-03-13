import { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { destroyCarAsync } from "./carSlice";

interface carButGroop {
  car_id: number;
  dispatch: Dispatch<any>;
  toggleCarEditForm: () => void;
  isCarEditing: boolean;
}
export function CarButtonGroup(props: carButGroop) {

  const handleDelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const payload = {
      car: {
        car_id: props.car_id,
      },
    };
    props.dispatch(destroyCarAsync(payload));
  };

  return (
    <div className="CarButtonGroup">
      <button className="btn-warning" onClick={() => props.toggleCarEditForm()}>
        {props.isCarEditing? "Cancel" : "Edit"}
      </button>
      {props.isCarEditing? "" : <button className="btn-danger" onClick={(e) => handleDelClick(e)}>
        Delete
      </button>}
    </div>
  );
}
