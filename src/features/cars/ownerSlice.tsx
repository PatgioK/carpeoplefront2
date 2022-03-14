import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
      setOwner: (state, action: PayloadAction<number>) => {
        state.id = action.payload;
      }
    },
    extraReducers: (builder) => {}
  })


export const selectOwner= (state: RootState) => state.selectedOwner.id;
export default ownerSlice.reducer;
export const { setOwner } = ownerSlice .actions 