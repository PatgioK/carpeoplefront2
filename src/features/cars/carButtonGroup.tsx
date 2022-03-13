import { Dispatch } from "@reduxjs/toolkit";
import { destroyCarAsync } from "./carSlice";

interface carButGroop {
  car_id: number;
  dispatch: Dispatch<any>;
  toggleCarEditForm: () => void;
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
      <button className="btn-danger" onClick={(e) => handleDelClick(e)}>
        Delete
      </button>
      <button className="editbutton" onClick={() => props.toggleCarEditForm()}>
        Edit
      </button>
    </div>
  );
}
