import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { Statuses } from "../people/peopleSlice";
import {fetchCars} from './carAPI';

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
    }
})

export const {} = carSlice.actions;

export const selectCars = (state: RootState) => state.cars.car;
export const selectCarStatus = (state:RootState) => state.cars.status;

export default carSlice.reducer;