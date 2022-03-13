import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPerson } from "../people/peopleSlice";

export function OwnerSelector() {
  const owners = useAppSelector(selectPerson);

  const createSelectItems = () => {
    let items = [];
    for (let i = 0; i < owners.length; i++) {
      items.push(
        <option key={i} value={i}>
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
  <select >
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
