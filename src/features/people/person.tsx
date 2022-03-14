import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch, memo } from "react";
import { Car } from "../cars/car";
import { fetchPersonAsync, PersonState } from "./peopleSlice";
import { PersonButtonGroup } from "./personButtonGroup";
import { CarFormData, CarState, selectCars, updateCarAsync } from "../cars/carSlice";
import './person.css'

interface PersonProps {
  dispatch: Dispatch<any>;
  person: PersonState;
  toggleEditForm: () => void;
  submitEdit: any;
  personToEdit: number;
  cars?: CarState[];
}

const Person = memo(function(props: PersonProps) {
  const [firstname, setFirstName] = useState(props.person.firstname);
  const [lastname, setLastName] = useState(props.person.lastname);
  const [email, setEmail] = useState(props.person.email);
  const dispatch = useDispatch();
  const [carToEdit, setCarToEdit] = useState(0);
  const [isEditing, setIsEditing] = useState(
    props.personToEdit === props.person.id
  );
  
  function toggleCarEditForm (car_id?: number) {
      if(carToEdit === car_id) {
          setCarToEdit(0);
      } else {
          setCarToEdit(car_id as number)
      }
    }
  
  function submitCarEdit(carData:CarFormData) {
    console.log(carData);
      dispatch(updateCarAsync(carData));
      toggleCarEditForm();

    dispatch(fetchPersonAsync());
  }

  useEffect(() => {
    setIsEditing(props.personToEdit === props.person.id);
  }, [props.personToEdit, props.person.id]);

  function submitHandler(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    const formData = {
      person: {
        id: props.person.id,
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    };
    props.submitEdit(formData);
    resetState();
    // dispatch(fetchPersonAsync())
  }

  function resetState() {
    setFirstName(props.person.firstname);
    setLastName(props.person.lastname);
    setEmail(props.person.email);
  }

  const fnameEle = <p className=""> {props.person.firstname}  </p>;
  const lnameEle = <p className="fnameEle">{props.person.lastname} </p>;
  const emailEle = <p className="fnameEle">{props.person.email}</p>;

  const editableFName = (
    <input
      type="text"
      className=""
      value={firstname}
      onChange={(e) => setFirstName(e.target.value)}
    ></input>
  );
  const editableLName = (
    <input
      type="text"
      className=""
      value={lastname}
      onChange={(e) => setLastName(e.target.value)}
    ></input>
  );
  const editableEmail = (
    <input
      type="text"
      className=""
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    ></input>
  );

  const submitButton = (
    <button type="submit" className="" onClick={(e) => submitHandler(e)}>
      Update
    </button>
  );

  // console.log(props.person.cars);

  return (
    <div className="personContainer">
      <h2>
      {isEditing ? editableFName : fnameEle}
      {isEditing ? editableLName : lnameEle}
      {isEditing ? editableEmail : emailEle}
      {isEditing ? submitButton : ""}</h2>
      <PersonButtonGroup
        dispatch={dispatch}
        person={props.person}
        toggleEditForm={props.toggleEditForm}
        isEditing={isEditing}
      />

      {props.person.cars &&
        props.person.cars?.length > 0 &&
        props.person.cars.map((carobj: CarState, idx) => {
          // console.log(carobj);
          return <Car 
          car={carobj} 
          dispatch={dispatch} 
          carToEdit={carToEdit} 
          submitCarEdit={submitCarEdit} 
          toggleCarEditForm={() => toggleCarEditForm(carobj.id)}
          key={idx} />;
        })}
        <br />
    </div>
  );
})

export default Person;
