import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import peopleReducer from '../features/people/peopleSlice'
import carsReducer from '../features/cars/carSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
    cars: carsReducer,
    // selectedOwner: ownerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
