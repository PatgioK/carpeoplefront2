// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../app/hooks';
// import { selectStatus } from '../people/peopleSlice';
// import {car, Car} from './car';
// import { CarFormData, selectCars } from './carSlice';

// interface cars {
//     cars?: car[];
// }

// function Cars (props: cars) {
// const cars = useAppSelector(selectCars);
// const status = useAppSelector(selectStatus);
// const dispatch = useDispatch();

// const [carToEdit, setCarToEdit] = useState(0);


// function toggleCarEditForm (car_id?: number) {
//     if(carToEdit === car_id) {
//         setCarToEdit(0);
//     } else {
//         setCarToEdit(car_id as number)
//     }
//   }

// function submitEdit(CarFormData:CarFormData) {
//     // dispatch(updateCarAsync(CarFormData));
//     toggleCarEditForm();
// }

//     return (
//         <div className="carcontainer">
//             <h2>cars container</h2>
//             {props.cars && props.cars?.length > 0 && props.cars!!.map((carobj: car, idx) => {
//                 console.log(carobj);
//                 return (
//                 <Car 
//                 {...carobj} 
//                 carToEdit={carToEdit} 
//                 submitEdit={submitEdit}
//                 toggleCarEditForm={() => toggleCarEditForm(carobj.car.id)}
//                 dispatch={dispatch} 
//                 key={idx}/>
//                 )
//             })}
//             </div>
//     )

// }

// export default Cars;

export {};

