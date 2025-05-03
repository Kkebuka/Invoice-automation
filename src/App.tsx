import "./App.css";
import ExcelParser from "./components/ExcelParser";
import DownloadPage from "./components/DownloadPage";
import DemoDashboard from "../src/components/demo/DemoDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExcelParser />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
      <Routes>
        <Route path="/funds" element={<DemoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
