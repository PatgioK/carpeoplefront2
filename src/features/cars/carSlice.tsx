import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { Statuses } from "../people/peopleSlice";
import {fetchCars, createCar, destroyCar, updateCar} from './carAPI';

export interface CarState {
    id?: number,
    year?:number,
    make?:string,
    model?: string,
    price?: number,
    person_id?: number
    created_at?: any,
    updated_at?: any,
}

export interface CarFormData {
    car: {
        id?: number,
        year?:number,
        make?:string,
        model?:string,
        price?:number,
        person_id:number,
    }
}

export interface CarDeleteData {
    car: {
        car_id: number,
    }
}

export interface CarsState {
    car: CarState[];
    status: string;
}

const initialState: CarsState = {
  car: [
    {
      id: 0,
      year: 0,
      make: "",
      model: "",
      price: 0,
      person_id: 0,
      created_at: "",
      updated_at: "",
    },
  ],
  status: Statuses.Initial,
};



export const fetchCarsAsync = createAsyncThunk(
    'cars/fetchCars',
    async() => {
        const response = await fetchCars();
        return response;
    }
)

export const createCarAsync = createAsyncThunk(
    'cars/createCar',
    async (payload:CarFormData) => {
        console.log(payload);
        const response = await createCar(payload);
        return response;
    }
)

export const destroyCarAsync = createAsyncThunk(
    'cars/destroyCar',
    async (payload:CarDeleteData) => {
        const response = await destroyCar(payload);

        return response;
    }
)

export const updateCarAsync = createAsyncThunk(
    'cars/updateCars',
    async (payload:CarFormData) => {
        const response = await updateCar(payload);

        return response;
    }
)

export const carSlice = createSlice({
    name: 'cars',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(fetchCarsAsync.pending, (state) => {
             return produce(state, (draftState) => {
                draftState.status = Statuses.Loading;
             })
         }) 

         .addCase(fetchCarsAsync.fulfilled, (state, action) => {
             return produce(state, (draftState) => {
                 draftState.status = Statuses.UpToDate
                 draftState.car = action.payload;
             })
         }) 
         .addCase(fetchCarsAsync.rejected, (state) => {
             return produce(state, (draftState) => {
                 draftState.status = Statuses.Error
             })
         }) 

         //create 
         .addCase(createCarAsync.pending, (state) => {
            return produce(state, (draftState) => {
               draftState.status = Statuses.Loading;
            })
        }) 

        .addCase(createCarAsync.fulfilled, (state, action) => {
            return produce(state, (draftState) => {
                draftState.car.push(action.payload);
                draftState.status = Statuses.UpToDate
            })
        }) 
        .addCase(createCarAsync.rejected, (state) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.Error
            })
        }) 
         //destroy

         .addCase(destroyCarAsync.pending, (state) => {
            return produce(state, (draftState) => {
               draftState.status = Statuses.Loading;
            })
        }) 

        .addCase(destroyCarAsync.fulfilled, (state, action) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.UpToDate
                draftState.car = action.payload;
            })
        }) 
        .addCase(destroyCarAsync.rejected, (state) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.Error
            })
        }) 

        //update

        .addCase(updateCarAsync.pending, (state) => {
            return produce(state, (draftState) => {
               draftState.status = Statuses.Loading;
            })
        }) 

        .addCase(updateCarAsync.fulfilled, (state, action) => {
            return produce(state, (draftState) => {
                const index = draftState.car.findIndex(
                    car => car.id === action.payload.id
                )

                draftState.car[index] = action.payload

                draftState.status = Statuses.UpToDate
            })
        }) 
        .addCase(updateCarAsync.rejected, (state) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.Error
            })
        }) 
    }
})

export const {} = carSlice.actions;

export const selectCars = (state: RootState) => state.cars.car;
export const selectCarStatus = (state:RootState) => state.cars.status;

export default carSlice.reducer;