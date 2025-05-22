import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { invitationsService } from "./invitationApi";
import toast from "react-hot-toast";
import "../../../components/account/team/swal.css";
import Swal from "sweetalert2";

interface invitations {
  email: string;
  role: string;
  company?: { _id: string; name?: string };
  workspace?: { _id: string; name?: string };
  sender: string | null;
  status?: string;
  _id?: string;
  createdAt?: Date;
}

interface invitationState {
  sendInvit: string;
  invitations: invitations[];
  error: string | null;
  status: string;
  deleteInvit: string;
}

const initialState: invitationState = {
  sendInvit: "",
  invitations: [],
  error: null,
  status: "idle",
  deleteInvit: "",
};

export const SendInvit = createAsyncThunk(
  "Invitations/sendInvit",
  async (invitData: invitations) => {
    try {
      const response = await invitationsService.invite(invitData);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const ReSendInvit = createAsyncThunk(
  "Invitations/ResendInvit",
  async (ResendData: invitations) => {
    try {
      const response = await invitationsService.resend(ResendData);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const DeleteById = createAsyncThunk(
  "Invitations/delteinvit",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await invitationsService.deleteById(id);

      return response.invitationsWithStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error remove invitation"
      );
    }
  }
);

export const GetInvitationBySenderId = createAsyncThunk(
  "Invitations/getBySender",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await invitationsService.getBySenderId(id);

      return response.invitationsWithStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching invitations"
      );
    }
  }
);

export const InvitationSlice = createSlice({
  name: "Invitations",
  initialState,
  reducers: {
    resetInvitationState: (state) => {
      state.sendInvit = "";
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SendInvit.pending, (state) => {
        state.sendInvit = "loading";
        state.error = null;
      })
      .addCase(SendInvit.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload.status == 201) {
          state.sendInvit = "success";
          state.invitations.push(action.payload);
          state.error = null;
          toast.success("invitation  sended successfully");
        } else {
          state.sendInvit = "failure";
          state.error = action.payload.message as string;
          toast.error(state.error, {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#FEE2E2",
              color: "#B91C1C",
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
            },
          });
        }
      })
      .addCase(SendInvit.rejected, (state, action) => {
        state.sendInvit = "failure";

        state.error = action.payload as string;

        toast.error(state.error || "Failed to send invitation", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#FEE2E2",
            color: "#B91C1C",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
          },
        });
      })

      .addCase(GetInvitationBySenderId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetInvitationBySenderId.fulfilled, (state, action) => {
        state.status = "success";
        state.invitations = action.payload;
      })
      .addCase(GetInvitationBySenderId.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload as string;
      })

      .addCase(DeleteById.pending, (state) => {
        state.deleteInvit = "loading";
        state.error = null;
      })

      .addCase(DeleteById.fulfilled, (state, action) => {
        state.deleteInvit = "success";
        state.invitations = state.invitations.filter(
          (inv) => inv._id !== action.payload
        );
        toast.success("invitation deleted successfully");
      })
      .addCase(DeleteById.rejected, (state, action) => {
        state.deleteInvit = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      })

      .addCase(ReSendInvit.pending, (state) => {
        state.sendInvit = "loading";
        state.error = null;
      })
      .addCase(ReSendInvit.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload.status == 200) {
          state.sendInvit = "success";
          state.invitations.push(action.payload);
          state.error = null;
          toast.success("invitation  sended successfully");
        } else {
          state.sendInvit = "failure";
          state.error = action.payload.message as string;
          // toast.error(state.error);

          Swal.fire({
            text: state.error,
            icon: "error",
            padding: "10px",

            confirmButtonText: "OK",
            confirmButtonColor: "#d33",

            customClass: {
              popup: "small-swal",
              icon: "small-icon",
            },
          });
        }
      })
      .addCase(ReSendInvit.rejected, (state, action) => {
        state.sendInvit = "failure";

        state.error = action.payload as string;

        Swal.fire({
          text: state.error,
          icon: "error",
          width: "250px",
          padding: "10px",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "small-swal",
            icon: "small-icon",
          },
        });
      });
  },
});

export const selectSendInvitStatus = (state: {
  Invitations: invitationState;
}) => state.Invitations.sendInvit;
export const selectInvitStatus = (state: { Invitations: invitationState }) =>
  state.Invitations.invitations;
export const selectStatus = (state: { Invitations: invitationState }) =>
  state.Invitations.status;
export const selectdeleteStatus = (state: { Invitations: invitationState }) =>
  state.Invitations.deleteInvit;

export const selectInvitError = (state: { Invitations: invitationState }) =>
  state.Invitations.error;

export default InvitationSlice.reducer;
export const { resetInvitationState } = InvitationSlice.actions;
