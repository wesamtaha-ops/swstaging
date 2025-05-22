import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id_user?: number;
  name?: string;
  email?: string;
  role?: string;
  plan?: string;
}

interface Form {
  id_form: number;
  title: string;
  json: Record<string, any>;
  createdBy: string;
  updatedAt: string;
}

interface SurveyState {
  isConnected: boolean;
  user: User | null;
  forms: Form[];
}

const initialState: SurveyState = {
  isConnected: false,
  user: null,
  forms: [],
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    login_survey: (state, action: PayloadAction<User>) => {
      state.isConnected = true;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    logout_survey: (state) => {
      state.isConnected = false;
      state.user = null;
    },
    getForms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    },
    getFiltredForms: (state, action: PayloadAction<number>) => {
      state.forms = state.forms.filter(
        (form) => form._id_form !== action.payload
      );
    },
    setPlan: (state, action: PayloadAction<string>) => {
      // state.user &&  state.user.plan = action.payload;
    },
  },
});

export const {
  login_survey,
  logout_survey,
  getForms,
  getFiltredForms,
  setPlan,
} = surveySlice.actions;

export default surveySlice.reducer;
