import EmplayeeLoginPage from "./components/EmployeePage/EmplayeeLoginPage";
import EmployeeSignUpPage from "./components/EmployeePage/EmployeeSignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeRoles from "./components/EmployeeRolesPage/EmployeeRoles";
import MenuMasterPage from "./components/MenuMasterPage/MenuMasterPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeSignUpPage />} />
          <Route path="/signup" element={<EmployeeSignUpPage />} />
          <Route path="/login" element={<EmplayeeLoginPage />} />
          <Route path="/roles" element={<EmployeeRoles />} />
          <Route path="/menumaster" element={<MenuMasterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
