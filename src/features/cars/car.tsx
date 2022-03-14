import { Dispatch, useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { fetchPersonAsync } from "../people/peopleSlice";
import { CarButtonGroup } from "./carButtonGroup";
import { CarFormData, CarState } from "./carSlice";
import { OwnerSelector } from "./ownerSelector";
import { selectOwner } from "./ownerSlice";

export interface car {
  car: CarState;
  dispatch: Dispatch<any>;
  carToEdit: number;
  submitCarEdit: (car: CarFormData) => void;
  toggleCarEditForm: () => void;
}

export const Car = memo(function(props: car) {
  const dispatch = useDispatch();
  const [year, setYear] = useState(props.car.year);
  const [make, setMake] = useState(props.car.make);
  const [model, setModel] = useState(props.car.model);
  const [price, setPrice] = useState(props.car.price);
  const owner = useAppSelector(selectOwner);
  const [isCarEditing, setIsCarEditing] = useState(props.carToEdit === props.car.id)

  useEffect(() => {
    setIsCarEditing(props.carToEdit === props.car.id)
  }, [props.carToEdit, props.car.id])

  let resetState = () => {
    setYear(props.car.year);
    setMake(props.car.make);
    setModel(props.car.model);
    setPrice(props.car.price);
  }
  
  const yearEle = <p>year: {props.car.year}</p>;
  const makeEle = <p>make: {props.car.make} </p>;
  const modelEle = <p>model: {props.car.model}</p>;
  const priceEle = <p>price: {props.car.price}</p>;

  const editableYear = (
    <input
      type="number"
      className=""
      value={year}
      onChange={(e) => setYear(parseInt(e.target.value))}
    />
  );
  const editableMake = (
    <input
      type="text"
      className=""
      value={make}
      onChange={(e) => setMake(e.target.value)}
    />
  );
  const editableModel = (
    <input
      type="text"
      className=""
      value={model}
      onChange={(e) => setModel(e.target.value)}
    />
  );
  const editablePrice = (
    <input
      type="number"
      className=""
      value={price}
      onChange={(e) => setPrice(parseInt(e.target.value))}
    />
  );

  let submitHandler = (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      const carData = {
          car: {
              id:props.car.id,
              year:year,
              make: make,
              price: price,
              model: model,
              person_id: owner,
          }
      }
      props.submitCarEdit(carData);
      resetState();
      dispatch(fetchPersonAsync())
  }

  const submitCarButton = (
    <button type="submit" className="" onClick={(e) => submitHandler(e)}>
      Update
    </button>
  );

  return (
    <div className="">
      <p>CAR:</p> {isCarEditing ? editableYear : yearEle} {isCarEditing ? editableMake : makeEle} {isCarEditing ? editableModel : modelEle} {isCarEditing ? editablePrice : priceEle}
      {isCarEditing ? <OwnerSelector />  : ""}
      {isCarEditing ? submitCarButton  : ""}
      <CarButtonGroup
        car_id={props.car.id!!}
        toggleCarEditForm={props.toggleCarEditForm}
        dispatch={dispatch}
        isCarEditing={isCarEditing}
      /> 
    </div>
  );
})
