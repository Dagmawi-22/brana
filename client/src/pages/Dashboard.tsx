import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Layout>
      <h2 className="text-3xl font-bold">Welcome to your Dashboard!</h2>
      <p className="mt-4">
        This is a protected page that only logged-in users can access.
      </p>
    </Layout>
  );
};

export default Dashboard;
