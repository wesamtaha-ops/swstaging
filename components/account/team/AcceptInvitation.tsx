import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AcceptInvitation: React.FC = () => {
 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvitation = async () => {
      const token = searchParams.get("token");

      if (!token) {
        Swal.fire("Error", "Invalid invitation link", "error");
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5050/invitations/accept",
          { token }
        );


        if (response.data.status === "expired") {
          Swal.fire("Error", "This invitation has expired", "error");
          navigate("/");
          return;
        }

        if (response.data.redirectUrl.includes("signup")) {
          
          localStorage.setItem("token", token);
          localStorage.setItem(
            "invitationData",
            JSON.stringify({
              email: response.data.email,
              role: response.data.role,
              companyId: response.data.entityId,
              workspaceId: response.data.entityId,
            })
          );
        }

     if ( response.data.redirectUrl) {
    

          Swal.fire({
            icon: "success",
            title: "Invitation accepted!",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
    window.location.href = response.data.redirectUrl;
          });
        }
      } catch (error: any) {
      
        
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";

        Swal.fire("Error", errorMessage, "error");

        if (errorMessage.includes("expired")) {
          navigate("/");
        }
      }
    };

    acceptInvitation();
  }, [searchParams, navigate]);

  return <></>;
};

export default AcceptInvitation;
