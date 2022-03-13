import { Dispatch, useState } from "react";
import { CarState } from "./carSlice";

export interface car {
    car: CarState,
    dispatch: Dispatch<any>,
}

export function Car (props: car) {
    // console.log(props.year);

    const [year, setYear] = useState(props.car.year);
    const [make, setMake] = useState(props.car.make);
    const [model, setModel] = useState(props.car.model);
    const [price, setPrice] = useState(props.car.price);

    const yearEle = <p>{props.car.year}</p>
    const makeEle = <p>{props.car.make} </p>
    const modelEle = <p>{props.car.model}</p>
    const priceEle = <p>{props.car.price}</p>
    return (
        <div className="car">
            <p>CAR:</p> {yearEle} {makeEle} {modelEle} {priceEle} 

            </div>
    )

}
