import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { CarState } from "../cars/carSlice";
import {
  fetchPeople,
  createPerson,
  updatePerson,
  destroyPerson,
} from "./peopleAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up to Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface PersonFormData {
  person: {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface PersonDeleteData {
  person: {
    person_id?: number;
  };
}

export interface PeopleState {
  person: PersonState[];
  status: string;
}
// TODO: change so dates export as json
// dates are set to any, idk how to fix error yet I know this is not right lol
export interface PersonState {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  created_at?: any;
  updated_at?: any;
  cars: CarState[];
}

const initialState: PeopleState = {
  person: [
    {
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      created_at: "",
      updated_at: "",
      cars: [],
    },
  ],
  status: Statuses.Initial,
};

export const fetchPersonAsync = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    const response = await fetchPeople();
    // console.log(response[0].id);
    // dispatch(setOwner(parseInt(response[0].id)))
    return response;
  }
);

export const createPersonAsync = createAsyncThunk(
  "people/createPerson",
  async (payload: PersonFormData) => {
    console.log(payload);
    const response = await createPerson(payload);

    return response;
  }
);
export const updatePersonAsync = createAsyncThunk(
  "people/updatePerson",
  async (payload: PersonFormData) => {
    const response = await updatePerson(payload);

    return response;
  }
);

export const destroyPersonAsync = createAsyncThunk(
  "people/destroyPerson",
  async (payload: PersonDeleteData) => {
    const response = await destroyPerson(payload);

    return response;
  }
);

export const peopleSlice = createSlice({
  name: "person",
  initialState,

  //Synchronous actions from rails frontend?
  reducers: {},

  //Async actions
  extraReducers: (builder) => {
    builder
      /** fetches */
      .addCase(fetchPersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          // console.log(action.payload);
          draftState.person = action.payload;
          // dispatch(setOwner(parseInt(response[0].id)))
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPersonAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      /**  Create*/
      .addCase(createPersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(createPersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.person.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(createPersonAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      //Update
      .addCase(updatePersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(updatePersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          console.log(action.payload);
          const index = draftState.person.findIndex(
            (person) => person.id === action.payload.person_id
          );
          draftState.person[index] = action.payload;
          // draftState.person = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(updatePersonAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      //Destroy
      .addCase(destroyPersonAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(destroyPersonAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.person = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(destroyPersonAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

// actions for frontend that dont really effect backend
// eg: how data sorted in frontend
//export const {setSortDirection} = peopleSlice.actions;
export const {} = peopleSlice.actions;

export const selectPerson = (state: RootState) => state.people.person;
export const selectStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;


// REDUCE reducers example : https://medium.com/@michalskoczylas/how-to-reduce-your-reducers-6e288c1fcd5d

// const reduceRequestState =
//   (requestTypes) =>
//   (state = RequestState.None, action) => {
//     switch (action.type) {
//       case requestTypes.start:
//         return RequestState.Waiting;
//       case requestTypes.success:
//         return RequestState.Success;
//       case requestTypes.error:
//         return RequestState.Error;
//       case requestTypes.reset:
//         return RequestState.None;
//       default:
//         return state;
//     }
//   };

// // saves `result` key from action payload
// const reduceResponseResult =
//   (requestTypes, init = null) =>
//   (state = init, action) => {
//     switch (action.type) {
//       case requestTypes.success:
//         return action.result;
//       case requestTypes.reset:
//         return null;
//       default:
//         return state;
//     }
//   };

// // saves given `fieldName` key from action payload `result`
// const reduceResponseField =
//   (requestTypes, fieldName, init) =>
//   (state = init, action) => {
//     switch (action.type) {
//       case requestTypes.success:
//         // response may not contain any results
//         const value = action.result[fieldName];
//         return value == null ? init : value;
//       case requestTypes.reset:
//         return init;
//       default:
//         return state;
//     }
//   };

// const reduceResponseErrors =
//   (requestTypes) =>
//   (state = null, action) => {
//     switch (action.type) {
//       case requestTypes.success:
//       case requestTypes.reset:
//         return null;
//       case requestTypes.error:
//         return action.error;
//       default:
//         return state;
//     }
//   };


