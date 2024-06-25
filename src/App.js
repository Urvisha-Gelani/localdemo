import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import UserDashBoard from "./components/userPages/UserDashBoard";
import UsersCompanies from "./components/userPages/UsersCompanies";
import LogInForm from "./components/formPages/logInForm";
import SignUpForm from "./components/formPages/SignUnForm";
import CompanyDepart from "./components/compnaiesPages/CompanyDepart";
import CompanyPage from "./components/compnaiesPages/CompanyPage";
import { apiToken } from "./commonJs/Common";
import UserDepartments from "./components/userPages/UserDepartments";
import DepartmentEmployees from "./components/compnaiesPages/DepartmentEmployees";
import { useEffect, useState } from "react";
import { refreshTokenUpdate } from "./components/userfeatures/UserSlice";
import CompanyEmployees from "./components/compnaiesPages/CompanyEmployees";
import UserEmployees from "./components/userPages/UserEmployees";


function App() {
  const { logInSuccess, tokenExpire } = useSelector(state => state.Users)
  const [countDown, setCountDown] = useState(tokenExpire);
  const dispatch = useDispatch()
  useEffect(() => {
    if ((apiToken() && countDown > 0)) {
      var timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown == 0) {
      dispatch(refreshTokenUpdate())
      setCountDown(tokenExpire)
    }
    return () => clearInterval(timer);
  }, [logInSuccess, countDown]);

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route>
            {(logInSuccess && apiToken()) ? <Route index element={<LogInForm />} /> : <Route index element={<UserDashBoard />} />}
            <Route path="logIn" element={<LogInForm />} />
            <Route path="signUp" element={<SignUpForm />} />
            <Route path="dashboard" element={<UserDashBoard countDown={countDown} />} />
            <Route path="companies" element={<UsersCompanies />} />
            <Route path="/companies/:CompanyId/departments" element={<CompanyDepart />} />
            <Route path='companies/:CompanyId/departments/:departmentId/employees' element={<DepartmentEmployees />} />
            <Route path="/companies/:CompanyId" element={<CompanyPage />} />
            <Route path="companies/:CompanyId/employees" element={<CompanyEmployees/>}/>
            <Route path='departments' element={<UserDepartments />} />
            <Route path="employees" element={<UserEmployees />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
