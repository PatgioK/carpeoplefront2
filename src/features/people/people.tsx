import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCars } from "../cars/carSlice";
import { selectPerson, fetchPersonAsync, updatePersonAsync, Statuses, selectStatus, PersonFormData } from "./peopleSlice";
import Person from './person';
import {PersonForm } from "./personForm";

function People() {
  const people = useAppSelector(selectPerson);
  const status = useAppSelector(selectStatus);

  const [personToEdit, setPersonToEdit] = useState(0)

  // workaround: using normal dispatch, useAppDispatch cant be used in callback
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonAsync());
  }, [dispatch])

  function toggleEditForm(person_id?:number) {
    // if we have editable fields out, we want to set back to default
    if (personToEdit=== person_id) {
      setPersonToEdit(0);
    } else {
      //otherwise we're clicking on it and dont have forms yet.
      setPersonToEdit(person_id as number);
    }
  }

  function submitEdit(formData:PersonFormData) {
    dispatch(updatePersonAsync(formData));
    toggleEditForm();
  }

  let contents;

  if(status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <><div className="peoplecontainer">
      <h3>{status}</h3>
      <PersonForm />
      
      {people && people.length > 0 && people.map(person => {
        return <div key={person.id}>
          <Person
           dispatch={dispatch} 
           person={person}
           toggleEditForm={() => toggleEditForm(person.id)}
           personToEdit={personToEdit}
           submitEdit={submitEdit}
           />

          </div>
      })}
      </div></>
  }

  return ( <div>
    {contents}
    </div>
  );
}
export default People;
