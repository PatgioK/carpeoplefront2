import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectPerson } from "../people/peopleSlice";
import { setOwner } from "./ownerSlice";

export function OwnerSelector() {
  const dispatch = useDispatch();
  const owners = useAppSelector(selectPerson);

  useEffect(() => {
    if (owners.length > 0) dispatch(setOwner(owners[0].id!!));
  }, []);
  const createSelectItems = () => {
    let items = [];
    if (owners.length > 0) {
      for (let i = 0; i < owners.length; i++) {
        items.push(
          <option key={i} value={owners[i].id}>
            {owners[i].firstname}
          </option>
        );
      }
      // dispatch(setOwner(owners[0].id!!));
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
    dispatch(setOwner(parseInt(selected.value)));
  };

  const selector = (
    <select id="OwnerSelector" onChange={onDropdownSelected}>
      {createSelectItems()}
    </select>
  );

  return <div>{selector}</div>;
}
