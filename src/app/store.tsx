import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/company/companySlice";
import invitReducer from "../features/invitations/invitationSlice";
import roleReducer from "../features/roles/roleSlice";
import userReducer from "../features/users/userSlice";
import workspaceReducer from "../features/workspace/workspaceSlice";
import surveyReducer from "../features/survey/SurveySlice";
export const store = configureStore({
  reducer: {
    Companys: companyReducer, // reducers
    Invitations: invitReducer,
    roles: roleReducer,
    Users: userReducer,
    workspaces: workspaceReducer,
    survey: surveyReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
