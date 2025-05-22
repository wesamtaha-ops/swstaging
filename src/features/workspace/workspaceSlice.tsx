import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { workspacesService } from "./workspaceApi";
import { RootState } from "@/src/app/store";

interface Team {
  _id: string;
  username: string;
  email: string;
  role: string;
  isPermission?: boolean;
}
// Type pour un workspace
interface Workspace {
  _id?: string;
  name: string;
  companyOwner: string;
  forms?: string;
  team?: [];
  createdAt?: Date;
  surveyCount?: number;
}

// Type pour l'état Redux
interface WorkspaceState {
  workspaces: Workspace[];
  addWorkspace: string;
  getWorkspaces: string;
  deleteWorkspace: string;
  updateWorkspace: string;
  teamsByWorkspace: {
    [key: string]: Team[];
  };
  error: string | null;
  getTeam: string;
}

const initialState: WorkspaceState = {
  workspaces: [],
  teamsByWorkspace: {},
  addWorkspace: "",
  getTeam: "",
  getWorkspaces: "",
  deleteWorkspace: "",
  updateWorkspace: "",
  error: null,
};

export const createWorkspace = createAsyncThunk(
  "workspaces/createWorkspace",
  async (workspaceData: Workspace) => {
    const response = await workspacesService.create(workspaceData);
    return response.data;
  }
);




export const fetchWorkspaces = createAsyncThunk(
  "workspaces/fetchWorkspaces",
  async (id: string) => {
    const response = await workspacesService.getAllByCompanyOwner(id);

    return response.workspaces;
  }
);

export const deleteWorkspace = createAsyncThunk(
  "workspaces/deleteWorkspace",
  async (id: string) => {
    await workspacesService.deleteById(id);
    return id;
  }
);

export const updateWorkspace = createAsyncThunk(
  "workspaces/updateWorkspace",
  async (data: { id: string; name: string }, { rejectWithValue }) => {
    try {
      if (!data.id) throw new Error("Workspace ID is required");

      const response = await workspacesService.updateById(data);

      return response.updatedWorkspace;
    } catch (error: any) {

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred while updating workspace.");
    }
  }
);



export const GetTeamByIdworkspace = createAsyncThunk(
  "workspaces/selectGetTeamByIdworkspace",
  async (id: string) => {
    const response = await workspacesService.getTeamByWorkspaceId(id);
    return response;
  }
);

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create  workspace
      .addCase(createWorkspace.pending, (state) => {
        state.addWorkspace = "loading";
        state.error = null;
      })
      .addCase(
        createWorkspace.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.addWorkspace = "success";
          state.workspaces = [...state.workspaces, action.payload];
          toast.success("Workspace created successfully");
        }
      )
      .addCase(createWorkspace.rejected, (state, action) => {
        state.addWorkspace = "failure";
        state.error = action.error.message as string;
      })

      //selectGetTeamByIdworkspace
      .addCase(GetTeamByIdworkspace.pending, (state) => {
        state.getTeam = "loading";
        state.error = null;
      })

      .addCase(GetTeamByIdworkspace.fulfilled, (state, action) => {
        state.getTeam = "success";
        state.teamsByWorkspace[action.meta.arg] = action.payload.team;
      })

      .addCase(GetTeamByIdworkspace.rejected, (state, action) => {
        state.getTeam = "failure";
        state.error = action.error.message as string;
      })

      //
      .addCase(fetchWorkspaces.pending, (state) => {
        state.getWorkspaces = "loading";
        state.error = null;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.getWorkspaces = "success";
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.getWorkspaces = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      })

      //
      .addCase(deleteWorkspace.pending, (state) => {
        state.deleteWorkspace = "loading";
        state.error = null;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.deleteWorkspace = "success";
        state.workspaces = state.workspaces.filter(
          (workspace) => workspace._id !== action.payload
        );
        toast.success("Workspace deleted successfully, members have been retained with the 'user' role ");
        // toast.success("Workspace deleted successfully");
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.deleteWorkspace = "failure";
        state.error = action.error.message as string;
        toast.error("Failed to delete workspace");
      })

      //
      .addCase(updateWorkspace.pending, (state) => {
        state.updateWorkspace = "loading";
        state.error = null;
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        state.updateWorkspace = "success";
        const index = state.workspaces.findIndex(
          (workspace) => workspace._id === action.payload._id
        );

        if (index !== -1) {
          state.workspaces[index] = action.payload;
        }

        toast.success("Workspace updated successfully");
      })

      .addCase(updateWorkspace.rejected, (state, action) => {
     
        state.updateWorkspace = "failure";
        state.error =  (action.payload as string) || "An unexpected error occurred";
        toast.error(state.error);
      });
  },
});

// **Sélecteurs**

// **Sélecteurs**
export const selectWorkspaces = (state: RootState) =>
  state.workspaces.workspaces;
export const selectAddWorkspaceStatus = (state: RootState) =>
  state.workspaces.addWorkspace;
export const selectGetWorkspacesStatus = (state: RootState) =>
  state.workspaces.getWorkspaces;
export const selectDeleteWorkspaceStatus = (state: RootState) =>
  state.workspaces.deleteWorkspace;
export const selectUpdateWorkspaceStatus = (state: RootState) =>
  state.workspaces.updateWorkspace;
export const selectWorkspaceError = (state: RootState) => state.workspaces.error;
export const selectWorkspaceTeam = (state: RootState) =>
  state.workspaces.teamsByWorkspace;

export default workspaceSlice.reducer;
