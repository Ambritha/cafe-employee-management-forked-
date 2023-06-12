import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { CafeList } from "./components/cafes/CafeList";
import { EmployeeList } from "./components/employees/EmployeeList";
import { CafeForm } from "./components/cafes/CafeForm";
import { EmployeeForm } from "./components/employees/EmployeeForm";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<CafeList />} />
          <Route exact path="/cafes" element={<CafeList />} />
          <Route exact path="/cafes/add" element={<CafeForm />} />
          <Route exact path="/cafes/edit/:id" element={<CafeForm />} />
          <Route exact path="/employees" element={<EmployeeList />} />
          <Route exact path="/employees/add" element={<EmployeeForm />} />
          <Route exact path="/employees/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
