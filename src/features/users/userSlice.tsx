import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import { usersService } from "./userApi";

interface users {
  email: string;
  username: string;
  role: string;
  _id?: string;
  createdAt?: Date;
}

interface userState {
  loading: boolean;
  users: users[];
  error: string | null;
  successUpdate: string;
  deleteUser: string;
  updatedUser: any | null;
  user: null;
}

const initialState: userState = {
  users: [],
  error: null,
  loading: false,
  deleteUser: "",
  successUpdate: "",
  updatedUser: null,
  user: null,
};

export const DeleteById = createAsyncThunk(
  "users/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await usersService.deleteById(id);

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error removed user"
      );
    }
  }
);

export const UpdatePermission = createAsyncThunk(
  "user/updatePermission",
  async (id: string, { rejectWithValue }) => {
    try {
      return await usersService.updatePermission(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UPDATEROLE = createAsyncThunk(
  "users/UpdateRole",
  async (data: {
    userId: string;
    newRole: string;
    entityId?: string;
    entityType?: string;
    confirmReassign?: string;
  }) => {
    if (!data.newRole) throw new Error(" role is required");

    const response = await usersService.updateRole(data);
    return response.data;
  }
);
export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(DeleteById.pending, (state) => {
        state.deleteUser = "loading";
        state.error = null;
      })

      .addCase(DeleteById.fulfilled, (state, action) => {
        state.deleteUser = "success";

        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })

      .addCase(DeleteById.rejected, (state, action) => {
        state.deleteUser = "failure";
        state.error = action.payload as string;
      })

      .addCase(UPDATEROLE.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.successUpdate = "";
      })
      .addCase(UPDATEROLE.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          state.updatedUser = action.payload.user;
        }
        state.successUpdate = "updated success";
      })
      .addCase(UPDATEROLE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //update permission

      .addCase(UpdatePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
       if (action.payload.isPermission) {
         toast.success("Permission granted to Workspace Owner!", {
           position: "top-right",
           duration: 3000,
         });
       } else {
         toast.success("Permission revoked from Workspace Owner!", {
           position: "top-right",
           duration: 3000,
         });
       }

       state.successUpdate = action.payload.isPermission
         ? "Permission true"
         : "Permission false";
      })
      .addCase(UpdatePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectdeleteUserStatus = (state: { Users: userState }) =>
  state.Users.deleteUser;
export const selectUsersStatus = (state: { Users: userState }) =>
  state.Users.users;
export const selectUserStatus = (state: { Users: userState }) =>
  state.Users.user;
export const selectSuccessStatus = (state: { Users: userState }) =>
  state.Users.successUpdate;

export const selectInvitError = (state: { Users: userState }) =>
  state.Users.error;

export default UsersSlice.reducer;
