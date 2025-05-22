// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Eye, EyeOff } from "lucide-react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import { useTranslation } from "react-i18next";

// interface FormData {
//   email: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }

// export default function SignupPage() {
//   const { t, i18n } = useTranslation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [role, setRole] = useState<string | null>(null);
//   const [email, setEmail] = useState<string | null>(null);
//   const [companyId, setCompanyId] = useState<string | null>(null);
//   const [workspaceId, setWorkspaceId] = useState<string | null>(null);
//   // Récupération du token d'invitation depuis l'URL
//   // const urlParams = new URLSearchParams(window.location.search);
//   const token = localStorage.getItem("token");
//   const invitationData = localStorage.getItem("invitationData");


//   const parsedInvitationData = invitationData
//     ? JSON.parse(invitationData)
//     : null;

//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Fonction pour valider le mot de passe (min 8 caractères alphanumériques)
//   const validatePassword = (password: string): boolean => {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
//   };

//   // Fonction pour valider l'email (format d'email valide)
//   const validateEmail = (email: string): boolean => {
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return regex.test(email);
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const showAutoCloseAlert = (): void => {
//     let timerInterval: NodeJS.Timeout;

//     Swal.fire({
//       title: t("signup.verifymail"),
//       html: t("signup.closingin"),
//       timer: 2000,
//       timerProgressBar: true,
//       didOpen: (popup) => {
//         Swal.showLoading();
//         const b = popup.querySelector("b");
//         if (b) {
//           timerInterval = setInterval(() => {
//             const timeLeft = Swal.getTimerLeft();
//             if (timeLeft !== null) {
//               b.textContent = `${timeLeft}`;
//             }
//           }, 100);
//         }
//       },
//       willClose: () => {
//         clearInterval(timerInterval);
//       },
//     }).then((result) => {
//       if (result.dismiss === Swal.DismissReason.timer) {
//         console.log("The alert was closed automatically.");
//       }
//     });
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (token) {
//       fetch(`https://swbackstg.vercel.app/invitations/getByToken/${token}`)
//         .then((response) => response.json())
//         .then((data) => {


//           setRole(data.role);
//           setEmail(data.email);
//           setCompanyId(data.companyId);
//           setWorkspaceId(data.workspaceId);
//         })
//         .catch((error) => {
//           console.error(
//             "Error retrieving invitation :",
//             error
//           );
//         });
//     }
//   }, [token]);
//   const emailToValidate = email || formData.email;
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     // Validation des mots de passe
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     // Validation de la longueur du mot de passe
//     if (!validatePassword(formData.password)) {
//       setError(
//         "Password must contain at least 8 characters, including letters and numbers"
//       );
//       return;
//     }

//     // Validation de l'email
//     // const emailToValidate = email || formData.email;
//     if (!emailToValidate || !validateEmail(emailToValidate)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // Vérifier si tous les champs sont remplis
//     if (!emailToValidate || !formData.username || !formData.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Récupération du token d'invitation depuis l'URL

//       let bodyData: any = {
//         email: emailToValidate,
//         username: formData.username,
//         password: formData.password,
//         role: role,
//         companyId: companyId,
//         workspaceId: workspaceId,
//         invitationToken: token, // Ajout du token d'invitation
//       };

//       const response = await fetch("https://swbackstg.vercel.app/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bodyData),
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.msg || "error");
//       } else {
//         showAutoCloseAlert();
//         setFormData({
//           email: "",
//           username: "",
//           password: "",
//           confirmPassword: "",
//         });
//         localStorage.removeItem("token");

//         localStorage.removeItem("invitationData");
//         navigate("/login", { replace: true });
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("error detected");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">

//       <div className="w-1/2 flex flex-col justify-center items-center px-8">
//         <div className="max-w-md w-full">
//           <h2 className="text-3xl font-almarai text-gray-800 text-center mb-4">
//             {t("signup.title")}
//           </h2>
//           <p className="text-sm text-gray-500 text-center mb-8">
//             {t("signup.already_have_account")}
//             <span className="mx-2 text-gray-300"> </span>
//             <Link to="/login" className="text-blue-500 underline">
//               {t("signup.sign_in")}
//             </Link>
//           </p>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-almarai mb-2">
//                 {t("signup.email_label")}
//                 <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
//               </label>
//               <input
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={emailToValidate}
//                 onChange={(e) => {
//                   setEmail(e.target.value)
//                   e.target.setCustomValidity("");
//                 }}
//                 onInvalid={(e) => {
//                   (e.target as HTMLInputElement).setCustomValidity(t("login.error"));
//                 }}
//                 required
//                 placeholder={t("signup.email_placeholder")}
//               />
//             </div>
//             {token && (
//               <div>
//                 <label className="block text-gray-700 text-sm font-almarai mb-2">
//                   Role assigned:
//                 </label>
//                 <input
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   type="text"
//                   value={role ?? ""}
//                   readOnly
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-gray-700 text-sm font-almarai mb-2">
//                 {t("signup.name_label")}
//                 <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
//               </label>
//               <input
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 placeholder={t("signup.name_placeholder")}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-almarai text-gray-700">
//                 {t("signup.password_label")}
//                 <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className={`appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${i18n.language === "ar" ? "pl-10" : "pr-10"
//                     }`}
//                   placeholder={t("signup.password_placeholder")}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className={`absolute inset-y-0 flex items-center text-gray-500 hover:text-gray-700 ${i18n.language === "ar" ? "left-3" : "right-3"
//                     }`}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-almarai text-gray-700">
//                 {t("signup.confirm_password_placeholder")}
//                 <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   name="confirmPassword"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder={t("signup.confirm_password_placeholder")}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className={`absolute inset-y-0 flex items-center text-gray-500 hover:text-gray-700 ${i18n.language === "ar" ? "left-3" : "right-3"
//                     }`}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//             >
//               {isLoading ? t("signup.create_account") : t("signup.loading")}
//             </button>
//           </form>

//           {/* Dialog Modal */}
//           <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
//             <Dialog.Portal>
//               <Dialog.Overlay className="fixed inset-0 bg-black/50" />
//               <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg">
//                 <Dialog.Title className="text-xl   font-bold font-almarai font-almarai  font-almarai mb-4">
//                   {t("signup.success_title")}
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-gray-600">
//                     {t("signup.success_message")}
//                   </p>
//                   <div className="mt-6 flex justify-center">
//                     <Dialog.Close asChild>
//                       <button
//                         onClick={() => {
//                           window.location.href = "/dashboard";
//                         }}
//                         className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
//                       >
//                         {t("signup.ok")}
//                       </button>
//                     </Dialog.Close>
//                   </div>
//                 </div>
//               </Dialog.Content>
//             </Dialog.Portal>
//           </Dialog.Root>
//         </div>
//       </div>

//       {/* Section droite - Informations */}
//       <div
//         className="w-1/2 flex flex-col justify-center items-center relative"
//         style={{
//           backgroundImage: `url('/assets/background.png')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-blue-500 bg-opacity-40"></div>

//         <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
//           <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-green-600">
//             {t("login.about_us")}
//           </button>
//           <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai text-black my-6">
//             {t("login.build_a_form")}
//           </h1>

//           {/* Section des logos alignée en bas */}
//           <div className="absolute bottom-12 w-full flex flex-col items-center">
//             <div className="flex gap-6 items-center justify-center bg-transparent">
//               <img
//                 src="/assets/blend.png"
//                 alt="Blend"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/bloomreach.png"
//                 alt="Bloomreach"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/cameo.png"
//                 alt="Cameo"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/hippo.png"
//                 alt="Hippo"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/bitpanda.png"
//                 alt="Bitpanda"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/chargebee.png"
//                 alt="Chargebee"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//             </div>
//             <p className="text-gray-600 mt-4 mb-2">
//               {t("login.trusted_by_clients")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Eye, EyeOff } from "lucide-react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// interface FormData {
//   email: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [role, setRole] = useState<string | null>(null);
//   const [email, setEmail] = useState<string | null>(null);
//   const [companyId, setCompanyId] = useState<string | null>(null);
//   const [workspaceId, setWorkspaceId] = useState<string | null>(null);
//   // Récupération du token d'invitation depuis l'URL
//   // const urlParams = new URLSearchParams(window.location.search);
//   const token = localStorage.getItem("token");
//   const invitationData = localStorage.getItem("invitationData");


//   const parsedInvitationData = invitationData
//     ? JSON.parse(invitationData)
//     : null;

//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Fonction pour valider le mot de passe (min 8 caractères alphanumériques)
//   const validatePassword = (password: string): boolean => {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
//   };

//   // Fonction pour valider l'email (format d'email valide)
//   const validateEmail = (email: string): boolean => {
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return regex.test(email);
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const showAutoCloseAlert = (): void => {
//     let timerInterval: NodeJS.Timeout;

//     Swal.fire({
//       title: "Verify your Email!",
//       html: "Closing in <b></b> milliseconds.",
//       timer: 2000,
//       timerProgressBar: true,
//       didOpen: (popup) => {
//         Swal.showLoading();
//         const b = popup.querySelector("b");
//         if (b) {
//           timerInterval = setInterval(() => {
//             const timeLeft = Swal.getTimerLeft();
//             if (timeLeft !== null) {
//               b.textContent = `${timeLeft}`;
//             }
//           }, 100);
//         }
//       },
//       willClose: () => {
//         clearInterval(timerInterval);
//       },
//     }).then((result) => {
//       if (result.dismiss === Swal.DismissReason.timer) {
//         console.log("The alert was closed automatically.");
//       }
//     });
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (token) {
//       fetch(`https://swbackstg.vercel.app/invitations/getByToken/${token}`)
//         .then((response) => response.json())
//         .then((data) => {


//           setRole(data.role);
//           setEmail(data.email);
//           setCompanyId(data.companyId);
//           setWorkspaceId(data.workspaceId);
//         })
//         .catch((error) => {
//           console.error(
//             "Erreur lors de la récupération de l'invitation :",
//             error
//           );
//         });
//     }
//   }, [token]);
//   const emailToValidate = email || formData.email;
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     // Validation des mots de passe
//     if (formData.password !== formData.confirmPassword) {
//       setError("Les mots de passe ne correspondent pas");
//       return;
//     }

//     // Validation de la longueur du mot de passe
//     if (!validatePassword(formData.password)) {
//       setError(
//         "Le mot de passe doit contenir au moins 8 caractères, incluant des lettres et des chiffres"
//       );
//       return;
//     }

//     // Validation de l'email
//     // const emailToValidate = email || formData.email;
//     if (!emailToValidate || !validateEmail(emailToValidate)) {
//       setError("Veuillez entrer un email valide");
//       return;
//     }

//     // Vérifier si tous les champs sont remplis
//     if (!emailToValidate || !formData.username || !formData.password) {
//       setError("Tous les champs sont requis");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Récupération du token d'invitation depuis l'URL

//       let bodyData: any = {
//         email: emailToValidate,
//         username: formData.username,
//         password: formData.password,
//         role: role,
//         companyId: companyId,
//         workspaceId: workspaceId,
//         invitationToken: token, // Ajout du token d'invitation
//       };

//       const response = await fetch("https://swbackstg.vercel.app/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bodyData),
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.msg || "error");
//       } else {
//         showAutoCloseAlert();
//         setFormData({
//           email: "",
//           username: "",
//           password: "",
//           confirmPassword: "",
//         });
//         localStorage.removeItem("token");

//         localStorage.removeItem("invitationData");
//         navigate("/login", { replace: true });
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("error detected");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">

//       <div className="w-1/2 flex flex-col justify-center items-center px-8">
//         <div className="max-w-md w-full">
//           <h2 className="text-3xl font-almarai text-gray-800 text-center mb-4">
//             Create your account
//           </h2>
//           <p className="text-sm text-gray-500 text-center mb-8">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 underline">
//               Sign in
//             </Link>
//           </p>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-almarai mb-2">
//                 Email address
//               </label>
//               <input
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 type="email"
//                 name="email"
//                 value={emailToValidate}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//               />
//             </div>
//             {token && (
//               <div>
//                 <label className="block text-gray-700 text-sm font-almarai mb-2">
//                   Role assigned:
//                 </label>
//                 <input
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   type="text"
//                   value={role??""}
//                   readOnly
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-gray-700 text-sm font-almarai mb-2">
//                 Full name
//               </label>
//               <input
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-almarai text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-almarai text-gray-700">
//                 Confirm password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordVisibility}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer ${
//                 isLoading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? "Creating account..." : "Create account"}
//             </button>
//           </form>

//           {/* Dialog Modal */}
//           <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
//             <Dialog.Portal>
//               <Dialog.Overlay className="fixed inset-0 bg-black/50" />
//               <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg">
//                 <Dialog.Title className="text-xl   font-bold font-almarai font-almarai  font-almarai mb-4">
//                   Inscription réussie ! 🎉
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-gray-600">
//                     Votre compte a été créé avec succès.
//                   </p>
//                   <div className="mt-6 flex justify-center">
//                     <Dialog.Close asChild>
//                       <button
//                         onClick={() => {
//                           window.location.href = "/dashboard";
//                         }}
//                         className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
//                       >
//                         OK
//                       </button>
//                     </Dialog.Close>
//                   </div>
//                 </div>
//               </Dialog.Content>
//             </Dialog.Portal>
//           </Dialog.Root>
//         </div>
//       </div>

//       {/* Section droite - Informations */}
//       <div
//         className="w-1/2 flex flex-col justify-center items-center relative"
//         style={{
//           backgroundImage: `url('/assets/background.png')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-blue-500 bg-opacity-40"></div>

//         <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
//           <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-green-600">
//             About Us
//           </button>
//           <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai text-black my-6">Build a form</h1>

//           {/* Section des logos alignée en bas */}
//           <div className="absolute bottom-12 w-full flex flex-col items-center">
//             <div className="flex gap-6 items-center justify-center bg-transparent">
//               <img
//                 src="/assets/blend.png"
//                 alt="Blend"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/bloomreach.png"
//                 alt="Bloomreach"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/cameo.png"
//                 alt="Cameo"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/hippo.png"
//                 alt="Hippo"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/bitpanda.png"
//                 alt="Bitpanda"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//               <img
//                 src="/assets/chargebee.png"
//                 alt="Chargebee"
//                 className="h-7 bg-grey filter grayscale mix-blend-multiply"
//               />
//             </div>
//             <p className="text-gray-600 mt-4 mb-2">
//               Trusted by a wide range of clients
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  // Récupération du token d'invitation depuis l'URL
  // const urlParams = new URLSearchParams(window.location.search);
  const token = localStorage.getItem("token");
  const invitationData = localStorage.getItem("invitationData");


  const parsedInvitationData = invitationData
    ? JSON.parse(invitationData)
    : null;

  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Fonction pour valider le mot de passe (min 8 caractères alphanumériques)
  // const validatePassword = (password: string): boolean => {
  //   const regex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  //   return regex.test(password);
  // };
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // Fonction pour valider l'email (format d'email valide)
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAutoCloseAlert = (): void => {
    let timerInterval: NodeJS.Timeout;

    Swal.fire({
      title: "Verify your Email!",
      html: "Closing in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: (popup) => {
        Swal.showLoading();
        const b = popup.querySelector("b");
        if (b) {
          timerInterval = setInterval(() => {
            const timeLeft = Swal.getTimerLeft();
            if (timeLeft !== null) {
              b.textContent = ` ${timeLeft}`;
            }
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("The alert was closed automatically.");
      }
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      fetch(`https://swbackstg.vercel.app/invitations/getByToken/${token} `)
        .then((response) => response.json())
        .then((data) => {


          setRole(data.role);
          setEmail(data.email);
          setCompanyId(data.companyId);
          setWorkspaceId(data.workspaceId);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de l'invitation :",
            error
          );
        });
    }
  }, [token]);
  const emailToValidate = email || formData.email;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Validation de la longueur du mot de passe
    if (!validatePassword(formData.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, incluant des lettres et des chiffres"
      );
      return;
    }

    // Validation de l'email
    // const emailToValidate = email || formData.email;
    if (!emailToValidate || !validateEmail(emailToValidate)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    // Vérifier si tous les champs sont remplis
    if (!emailToValidate || !formData.username || !formData.password) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      setIsLoading(true);

      // Récupération du token d'invitation depuis l'URL

      let bodyData: any = {
        email: emailToValidate,
        username: formData.username,
        password: formData.password,
        role: role,
        companyId: companyId,
        workspaceId: workspaceId,
        invitationToken: token, // Ajout du token d'invitation
      };

      const response = await fetch("https://swbackstg.vercel.app/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "error");
      } else {
        showAutoCloseAlert();
        setFormData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.removeItem("token");

        localStorage.removeItem("invitationData");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("error detected");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">

      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-almarai text-gray-800 text-center mb-4">
            {t("signup.title")}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            {t("signup.already_have_account")}
            <Link to="/login" className="text-blue-500 underline">
              {t("signup.sign_in")}
            </Link>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-almarai mb-2">
                {t("signup.email_label")}
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
                value={emailToValidate}
                onChange={handleChange}
                required
                placeholder={t("signup.email_placeholder")}
              />
            </div>
            {token && (
              <div>
                <label className="block text-gray-700 text-sm font-almarai mb-2">
                  Role assigned:
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={role ?? ""}
                  readOnly
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-almarai mb-2">
                {t("signup.name_label")}
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder={t("signup.name_placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm font-almarai text-gray-700">
                {t("signup.password_label")}
              </label>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t("signup.password_placeholder")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-almarai text-gray-700">
                {t("signup.confirm_password_placeholder")}
              </label>
              <div className="mt-1 relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t("signup.confirm_password_placeholder")}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? t("signup.create_account") : t("signup.loading")}
            </button>
          </form>

          {/* Dialog Modal */}
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg">
                <Dialog.Title className="text-xl   font-bold font-almarai font-almarai  font-almarai mb-4">
                  {t("signup.success_title")}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-600">
                    {t("signup.success_message")}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Dialog.Close asChild>
                      <button
                        onClick={() => {
                          window.location.href = "/dashboard";
                        }}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        {t("signup.ok")}
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Section droite - Informations */}
      <div
        className="w-1/2 flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url('/assets/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-40"></div>

        <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
          <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-green-600">
            {t("login.about_us")}
          </button>
          <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai text-black my-6">
            {t("login.build_a_form")}
          </h1>

          {/* Section des logos alignée en bas */}
          <div className="absolute bottom-12 w-full flex flex-col items-center">
            <div className="flex gap-6 items-center justify-center bg-transparent">
              <img
                src="/assets/blend.png"
                alt="Blend"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/bloomreach.png"
                alt="Bloomreach"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/cameo.png"
                alt="Cameo"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/hippo.png"
                alt="Hippo"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/bitpanda.png"
                alt="Bitpanda"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/chargebee.png"
                alt="Chargebee"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
            </div>
            <p className="text-gray-600 mt-4 mb-2">
              {t("login.trusted_by_clients")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
