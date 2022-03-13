import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectStatus } from '../people/peopleSlice';
import {car, Car} from './car';
import { selectCars } from './carSlice';

interface cars {
    cars?: car[];
}

function Cars (props: cars) {
const cars = useAppSelector(selectCars);
const status = useAppSelector(selectStatus);

const dispatch = useDispatch();

    return (
        <div className="carcontainer">
            <h2>cars container</h2>
            {props.cars && props.cars?.length > 0 && props.cars!!.map((carobj: car, idx) => {
                console.log(carobj);
                return (
                <Car {...carobj} dispatch={dispatch} key={idx}/>
                )
            })}
            </div>
    )

}

export default Cars;