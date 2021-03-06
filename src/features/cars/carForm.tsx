import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { fetchPersonAsync, PersonState } from "../people/peopleSlice";
import { createCarAsync } from "./carSlice";
import { OwnerSelector } from "./ownerSelector";
import { selectOwner } from "./ownerSlice";

export const CarForm = () => {
  const owner = useAppSelector(selectOwner);
  const dispatch = useDispatch();

  const [year, setYear] = useState(-1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(-1);

  let resetState = () => {
    setYear(-1);
    setMake("");
    setModel("");
    setPrice(-1);
  };

  let submitHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = {
      car: {
        year: year,
        make: make,
        model: model,
        price: price,
        person_id: owner,
      },
    };
    console.log(formData);
    dispatch(createCarAsync(formData));
    resetState();
    dispatch(fetchPersonAsync());
  };

  return (
    <div className="carForm">
        {/* <h1>current owner selector: {owner}</h1> */}
      <h3>Create Car Form</h3>
      <label>Choose Owner: </label>
      <OwnerSelector />
      <label>year: </label>
      <input
        type="number"
        name="yearinput"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
      />
      <label>make: </label>
      <input
        type="text"
        className="form-control text-start"
        name="makeinput"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />

      <label>model: </label>
      <input
        type="text"
        className="form-control text-start"
        name="modelinput"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <label>price: </label>
      <input
        type="number"
        name="priceinput"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />

      <button type="submit" onClick={(e) => submitHandler(e)}>
        Submit
      </button>
    </div>
  );
}
