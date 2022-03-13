import { useState } from "react"
import { useAppSelector } from "../../app/hooks";
import { selectPerson } from "../people/peopleSlice";
import { OwnerSelector } from "./ownerSelector";


export function CarForm (props: any) {
    const people = useAppSelector(selectPerson);

    const [year, setYear] = useState(0);
    const [make, setMake] = useState('')
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);

    console.log(people);


    return ( 
    <div className="Car Form">
        <h1>Create Car Form</h1>
        <label>Choose Owner: </label>
        <OwnerSelector />

    </div>

    )

}