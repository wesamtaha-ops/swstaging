import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@/components/providers/AuthProvider";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App  />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
