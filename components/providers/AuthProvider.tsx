import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  login_survey,
  logout_survey,
} from "../../src/features/survey/SurveySlice";
import { useDispatch, useSelector } from "react-redux";
export interface User {
  // Informations de base
  _id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  companyId: { id: string; name: string };
  workspaceId: { id: string; name: string };
  isPermission: boolean;
  createdAt?: Date;
  plan?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  // login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isRolePermission: (permission_name: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  // login: async () => {},
  logout: async () => {},
  isRolePermission: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const login = async (email: string, password: string) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch("https://swbackstg.vercel.app/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.msg || "Login failed");
  //     }

  //     setIsAuthenticated(true);
  //     setUser(data.user);
  //     dispatch(login_survey(data.user));
  //     //navigate("/dashboard");
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const login = async (email: string, password: string) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch("https://swbackstg.vercel.app/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.msg || "Login failed");
  //     }

  //     setIsAuthenticated(true);
  //     setUser(data.user);
  //     dispatch(login_survey(data.user));
  //     // navigate("/dashboard");
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const logout = async () => {
    try {
      // setIsLoading(true);

      await fetch("https://swbackstg.vercel.app/user/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      // Vérifier si l'utilisateur est authentifié
      const response = await fetch("https://swbackstg.vercel.app/user/authenticated", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.info(data.user, "...isAuth");

        setUser(data.user);
        setIsAuthenticated(true);
        dispatch(login_survey(data.user));
        return;
      }

      // Si le token est expiré, on tente de le rafraîchir
      console.warn("Token expiré, tentative de rafraîchissement...");

      const refreshResponse = await fetch(
        "https://swbackstg.vercel.app/user/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        console.log("Nouveau access token reçu :", refreshData.accessToken);

        // Réessayer la requête authenticated après rafraîchissement
        const retryResponse = await fetch(
          "https://swbackstg.vercel.app/user/authenticated",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          console.info(retryData.user, "...isAuth après refresh");

          setUser(retryData.user);
          setIsAuthenticated(true);
          dispatch(login_survey(retryData.user));
          return;
        }
      }

      // Si le refresh échoue, désauthentifier l'utilisateur
      console.error("Échec du rafraîchissement du token, déconnexion...");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isCheckAuthRun = useRef(false);
  useEffect(() => {
    if (!isCheckAuthRun.current) {
      isCheckAuthRun.current = true;
      checkAuth();
    }
  }, []);

  // const checkAuth = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch("https://swbackstg.vercel.app/user/authenticated", {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.info(data.user, "...isAuth");

  //       setUser(data.user);
  //       setIsAuthenticated(true);
  //       dispatch(login_survey(data.user));
  //     } else {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //   } catch (error) {
  //     console.error("Erreur verification connected user:", error);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const [permissions, setPermissions]: any = useState({
    btn_syrvey: {
      companyOwner: true,
      accountOwner: true,
      workspaceOwner: true,
      editor: false,
      viewer: false,
    },
    reports: {
      companyOwner: true,
      accountOwner: true,
      workspaceOwner: false,
      editor: false,
      viewer: false,
      user: true,
    },
    btn_manage: {
      companyOwner: true,
      accountOwner: true,
      workspaceOwner: true,
      editor: false,
      viewer: false,
    },
    btn_share: {
      companyOwner: true,
      accountOwner: true,
      workspaceOwner: true,
      editor: false,
      viewer: false,
    },
    btn_invite_member: {
      companyOwner: true,
      accountOwner: true,
      workspaceOwner: true,
      editor: false,
      viewer: false,
    },
  });

  const isRolePermission = (permission_name: string): boolean => {
    if (!user?.role) return false;
    if (user.role === "workspaceOwner" && !user.isPermission) return false;
    return permissions[permission_name]?.[user.role] ?? false;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, logout, isRolePermission }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte d'auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

export default AuthProvider;
