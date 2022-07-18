import { Route, Routes } from "react-router-dom";
import { Doctor } from "../Pages/Doctor";
import { Home } from "../Pages/Home";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor/:id" element={<Doctor />} />
    </Routes>
  );
}

//gs
