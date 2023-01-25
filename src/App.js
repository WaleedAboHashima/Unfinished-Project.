import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { RequireAuth } from "react-auth-kit";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
