import { createSlice } from "@reduxjs/toolkit";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectPerson } from "../people/peopleSlice";


interface oWner{
  id:number
}

const initialState: oWner = {
  id: -1,
}

export  const ownerSlice = createSlice({
  name: 'owner',
  initialState,

  reducers:{
    setOwner: (state) => {
      
      let own = document.getElementById("OwnerSelector") as HTMLSelectElement
      console.log(parseInt(own!!.options[own.selectedIndex].value));
      state.id = parseInt(own!!.options[own.selectedIndex].value);


    }
  },
  extraReducers: (builder) => {}
})

export function OwnerSelector() {
  const owners = useAppSelector(selectPerson);

  const createSelectItems = () => {
    let items = [];
    for (let i = 0; i < owners.length; i++) {
      items.push(
        <option key={i} value={owners[i].id}>
          {owners[i].firstname}
        </option>
      );
    }
    return items;
  };


//   const onDropdownSelected = (e: React.FormEvent<HTMLInputElement>) => {
    // const onDropdownSelected = (e: React.FormEvent<ChangeEvent>) => {
    //   console.log("THE VAL:" , e.target.value)
//   }
const onDropdownSelected = (e: React.FormEvent<HTMLInputElement>) => {
    let selected = e.target as HTMLInputElement;
    console.log(selected.value);
}

const selector = (
  <select id='OwnerSelector'>
{/* <option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="opel">Opel</option>
<option value="audi">Audi</option> */}
{createSelectItems()}
     </select>
)

  return (
    <div>
      {selector}
    </div>
  )
}

export const selectOwner= (state: RootState) => state.selectedOwner.id;
export default ownerSlice.reducer;
export const { setOwner } = ownerSlice .actions 