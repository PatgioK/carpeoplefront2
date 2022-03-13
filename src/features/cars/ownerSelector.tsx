import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectPerson } from "../people/peopleSlice";
import { setOwner } from "./ownerSlice";



export function OwnerSelector() {
  const dispatch = useDispatch();
  const owners = useAppSelector(selectPerson);

  const createSelectItems = () => {
    let items = [];
    if(owners.length > 0) {
    for (let i = 0; i < owners.length; i++) {
      if(i == 0){

    // dispatch(setOwner(owners[i].id!!))
      }
      items.push(
        <option key={i} value={owners[i].id}>
          {owners[i].firstname}
        </option>
      );
    }
  }
    return items;
  };


//   const onDropdownSelected = (e: React.FormEvent<HTMLInputElement>) => {
    // const onDropdownSelected = (e: React.FormEvent<ChangeEvent>) => {
    //   console.log("THE VAL:" , e.target.value)
//   }
const onDropdownSelected = (e: React.FormEvent<HTMLSelectElement>) => {
    let selected = e.target as HTMLInputElement;
    console.log(selected.value);
    dispatch(setOwner(parseInt(selected.value)))
}

const selector = (
  <select id='OwnerSelector' onChange={onDropdownSelected}>
{createSelectItems()}
     </select>
)

  return (
    <div>
      {selector}
    </div>
  )
}
