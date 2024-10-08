import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Callback = () => {
  const { fetchUserToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      fetchUserToken(code)
          .then(() => navigate("/"))
          .catch((error: any) => {
            console.error("Error during token fetch:", error);
            navigate("/login");
          });
    } else {
      navigate("/login");
    }
  }, [navigate, fetchUserToken]);

  return <div>Loading...</div>;
};

export default Callback;
