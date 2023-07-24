import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Result from "./pages/Result";
import Preview from "./pages/Preivew";

export const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};
