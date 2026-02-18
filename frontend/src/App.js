import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/clientDashboard";
import "./chartConfig"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Screen 1 */}
        <Route path="/" element={<RoleSelection />} />

        {/* Screen 2 */}
        <Route path="/admin" element={<Dashboard />} />

        {/* Client screens (we’ll build next) */}
        <Route path="/client/:id" element={<ClientDashboard />} />

      </Routes>
    </Router>
  );
}
