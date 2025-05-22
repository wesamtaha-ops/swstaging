// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import Subscribe from "@/components/pages/Subscribe";
import "./i18n";
//  Pages
import Home from "@/components/pages/Home";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import Dashboard from "@/components/pages/Dashboard";
import Forms from "@/components/pages/Forms";
import FormBuilder from "@/components/pages/FormBuilder";
import CreateForm from "@/components/pages/CreateForm";
import AIFormCreator from "@/components/pages/AIFormCreator";
import FormResults from "@/components/pages/FormResults";
import PublicSurvey from "@/components/account/PublicSurvey";
import SurveyR from "@/components/pages/SurveyR";
import Templates from "@/components/pages/Templates";
import Account from "@/components/pages/Account";
import Help from "@/components/pages/HelpAndSupport";
import Terms from "@/components/pages/Terms";
import Privacy from "@/components/pages/Privacy";
import Cookies from "@/components/pages/Cookies";
import Pricing from "@/components/pages/Pricing";
import ForgotPassword from "@/components/pages/ForgotPassword";

//  Team + Invites
import AcceptInvitation from "@/components/account/team/AcceptInvitation";
import { Invite } from "@/components/account/team/Invite";

//  edition + AI
import EditSurveyPage01 from "@/components/pages/EditSurveyPage01";
import EditSurveyPageAi from "@/components/pages/EditSurveyPageAi";
import AiCreator from "@/components/pages/AiCreator";

//  Prododuct
import FormBuilderProduct from "@/components/pages/products/FormBuilder";
import SurveyMaker from "@/components/pages/products/SurveyMaker";
import AIForms from "@/components/pages/products/AIForms";

//  Industries
import Education from "@/components/pages/industries/Education";
import Healthcare from "@/components/pages/industries/Healthcare";
import Retail from "@/components/pages/industries/Retail";
import HRRecruiting from "@/components/pages/industries/HRRecruiting";
import Enterprise from "@/components/pages/industries/Enterprise";
import RealEstate from "@/components/pages/industries/RealEstate";
import NonProfit from "@/components/pages/industries/NonProfit";

// another
import Docs from "@/components/pages/docs/index";
import ReferPage from "@/components/pages/ReferFriend";
import "../styles/globals.css";

// Private Routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

//  publique Routes
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          {/* publiques Routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscribe/:plan" element={<Subscribe />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/cookies" element={<Cookies />} />
          <Route path="/industries/education" element={<Education />} />
          <Route path="/industries/healthcare" element={<Healthcare />} />
          <Route path="/industries/retail" element={<Retail />} />
          <Route path="/industries/hr-recruiting" element={<HRRecruiting />} />
          <Route path="/industries/enterprise" element={<Enterprise />} />
          <Route path="/industries/real-estate" element={<RealEstate />} />
          <Route path="/industries/non-profit" element={<NonProfit />} />
          <Route
            path="/products/form-builder"
            element={<FormBuilderProduct />}
          />
          <Route path="/products/survey-maker" element={<SurveyMaker />} />
          <Route path="/products/ai-forms" element={<AIForms />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/refer" element={<ReferPage />} />

          {/*  restriction routes (redirection if connected) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          {/* Protected Routes  */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms"
            element={
              <ProtectedRoute>
                <Forms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/new"
            element={
              <ProtectedRoute>
                <FormBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/create"
            element={
              <ProtectedRoute>
                <CreateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/ai-create"
            element={
              <ProtectedRoute>
                <AIFormCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms/:formId/results"
            element={
              <ProtectedRoute>
                <FormResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/results/:id"
            element={
              <ProtectedRoute>
                {/* <SurveyR /> */}

                <FormResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />

          {/* invitations  Routes*/}
          <Route path="/accept-invitation" element={<AcceptInvitation />} />
          <Route
            path="/invites"
            element={
              <ProtectedRoute>
                <Invite />
              </ProtectedRoute>
            }
          />

          {/* Edit surveys */}
          <Route
            path="/update_survey/:id"
            element={
              <ProtectedRoute>
                <EditSurveyPage01 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/formai"
            element={
              <ProtectedRoute>
                <EditSurveyPageAi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/formaicreator"
            element={
              <ProtectedRoute>
                <AiCreator />
              </ProtectedRoute>
            }
          />

          {/* */}
          <Route path="/survey" element={<PublicSurvey />} />

          {/* default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
