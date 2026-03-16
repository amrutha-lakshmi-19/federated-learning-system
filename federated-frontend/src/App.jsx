import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ClientPage from "./pages/ClientPage";
import PredictionPage from "./pages/PredictionPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientPage />} />
        <Route path="/predict" element={<PredictionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
