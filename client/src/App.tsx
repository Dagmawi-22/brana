import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Dashboard /> : <Login />} />
        <Route
          path="/register"
          element={token ? <Dashboard /> : <Register />}
        />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
