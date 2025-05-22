import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { companyService } from "./companyApi";
import toast from "react-hot-toast";
import { Company } from "@/types";
import { RootState } from "@/src/app/store";

// Define the types for the state and response
interface Team {
  _id: string;
  username: string;
  email: string;
  role: string;
  isPermission?: boolean;
}

interface CompanyState {
  addCompany: string;
  companys: Company[];
  // team: Team[];
  teamsByCompany: {
    [key: string]: Team[];
  };
  getTeam: string;
  error: string | null;
  getCompany: string;
  deleteCompany: string;
  updateCompany: string;
  selectedCompany: Company | null;
  loadingCompanyId: string | null;
}

const initialState: CompanyState = {
  addCompany: "",
  companys: [],
  // team: [],
  teamsByCompany: {},
  error: null,
  getCompany: "",
  getTeam: "",
  deleteCompany: "",
  updateCompany: "",
  selectedCompany: null,
  loadingCompanyId: null,
};

export const CreateCompany = createAsyncThunk(
  "Companys/createCompany",
  async (companyData: Company) => {
    const response = await companyService.create(companyData);
    return response.data;
  }
);
export const GetCompanysByOwner = createAsyncThunk(
  "Companys/getCompanybyOwner",
  async (id: string) => {
    const response = await companyService.getCompaniesByUseId(id);
    return response;
  }
);
export const GetTeamByIdComapny = createAsyncThunk(
  "Companys/selectGetTeamByIdComapny",
  async (id: string) => {
    const response = await companyService.getTeamByCompanyId(id);
    return response;
  }
);

export const DeleteCompanyById = createAsyncThunk(
  "Companys/deleteCompanyById",
  async (id: string) => {
    const response = await companyService.deleteCompanyById(id);
    console.log(response, "responseresponseresponse");

    return id;
  }
);

export const UpdateCompanyById = createAsyncThunk(
  "companies/updateCompany",
  async (data: { id: string; name: string }, { rejectWithValue }) => {
    try {
      if (!data.id) throw new Error("company ID is required");

      const response = await companyService.updateCompanyById(data);

      return response.data.enterprise;
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

export const CompanySlice = createSlice({
  name: "Companys",
  initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<Company | null>) => {
      state.selectedCompany = action.payload;
    },
    setLoadingCompany(state, action: PayloadAction<string | null>) {
      state.loadingCompanyId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Req en cours
      .addCase(CreateCompany.pending, (state) => {
        state.addCompany = "loading";
        state.error = null;
      })
      .addCase(CreateCompany.fulfilled, (state, action: PayloadAction<any>) => {
        state.addCompany = "success";

        state.companys = [...state.companys, action.payload];
        toast.success("Company created successfully");
      })

      .addCase(CreateCompany.rejected, (state, action) => {
        state.addCompany = "failure";
        state.error = action.error.message as string;
      })

      //GetCompanyByOwnerId
      .addCase(GetCompanysByOwner.pending, (state) => {
        state.getCompany = "loading";
        state.error = null;
      })

      .addCase(GetCompanysByOwner.fulfilled, (state, action) => {
        state.companys = action.payload;
      })
      .addCase(GetCompanysByOwner.rejected, (state, action) => {
        state.getCompany = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      })
      //selectGetTeamByIdComapny
      .addCase(GetTeamByIdComapny.pending, (state) => {
        state.getTeam = "loading";
        state.error = null;
      })

      .addCase(GetTeamByIdComapny.fulfilled, (state, action) => {
        state.getTeam = "success";
        state.teamsByCompany[action.meta.arg] = action.payload.team;
      })

      .addCase(GetTeamByIdComapny.rejected, (state, action) => {
        state.getTeam = "failure";
        state.error = action.error.message as string;
      })

      //deleteComapny
      .addCase(DeleteCompanyById.pending, (state) => {
        state.deleteCompany = "loading";
        state.error = null;
      })

      .addCase(DeleteCompanyById.fulfilled, (state, action) => {
        state.deleteCompany = "success";
        state.companys = state.companys.filter(
          (company) => company._id !== action.payload
        );
        toast.success(
          "Company deleted successfully, members have been retained with the 'user' role."
        );
      })
      .addCase(DeleteCompanyById.rejected, (state, action) => {
        state.deleteCompany = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      })

      //update company
      .addCase(UpdateCompanyById.pending, (state) => {
        state.updateCompany = "loading";
        state.error = null;
      })

      .addCase(
        UpdateCompanyById.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(
            "🔥 Company slice update triggered:",
            action.type,
            action.payload
          );

          if (action.payload) {
            state.updateCompany = "success";

            const index = state.companys.findIndex(
              (company) => company._id === action.payload._id
            );

            if (index !== -1) {
              state.companys[index] = action.payload;
            }
            toast.success("Company updated successfully");
          } else {
            state.updateCompany = "failure";
            state.error = action.payload?.message as string;
            toast.error(state.error);
          }
        }
      )
      .addCase(UpdateCompanyById.rejected, (state, action) => {
        state.updateCompany = "failure";
        state.error = action.error.message as string;
        toast.error(state.error);
      });
  },
});

export const { setSelectedCompany, setLoadingCompany } = CompanySlice.actions;
export const selectCompanySelected = (state: RootState) =>
  state.Companys.selectedCompany;
export const loadingCompanySelected = (state: RootState) =>
  state.Companys.loadingCompanyId;

// Sélecteurs
export const selectCompanys = (state: RootState) => state.Companys.companys;
export const selectAddCompanyStatus = (state: RootState) =>
  state.Companys.addCompany;
export const selectGetCompanyByOwner = (state: RootState) =>
  state.Companys.companys;
export const selectGetTeamByIdComapny = (state: RootState) =>
  state.Companys.teamsByCompany;
export const selectGetTeam = (state: RootState) => state.Companys.getTeam;
export const selectDeleteComapy = (state: RootState) =>
  state.Companys.deleteCompany;
export const selectUpdateComapy = (state: RootState) =>
  state.Companys.updateCompany;
export const selectCompanyError = (state: RootState) => state.Companys.error;

export default CompanySlice.reducer;
