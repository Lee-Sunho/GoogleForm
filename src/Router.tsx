import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Result from "./pages/Result";

export const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};
