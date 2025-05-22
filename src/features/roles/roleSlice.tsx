import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { rolesService } from "./roleApi";

// Define the types for the state and response

interface role {
  name: string;
  description: string;
 
  _id?: string;
}
interface roleState {
  getrole: string;
  roles: role[];

  error: string | null;

}

// Initial state with types
const initialState: roleState = {
  getrole: "",
  roles: [],
 
  error: null,

};


export const GetRoleByOwner = createAsyncThunk(
  "roles/GetRoleByOwner",
  async (id: string) => {
    const response = await rolesService.getRoleByUseId(id);
    return response;
  }
);



export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //GetRoleByOwnerId
      .addCase(GetRoleByOwner.pending, (state) => {
        state.getrole= "loading";
        state.error = null;
      })

      .addCase(GetRoleByOwner.fulfilled, (state, action) => {
        state.roles = action.payload.roles;
      })
      .addCase(GetRoleByOwner.rejected, (state, action) => {
        state.getrole = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      });
   


  },
});


export const selectGetroleByOwner = (state: { roles: roleState }) =>
  state.roles.roles;

export const selectRoleError = (state: { roles: roleState }) =>
  state.roles.error;

export default rolesSlice.reducer;
