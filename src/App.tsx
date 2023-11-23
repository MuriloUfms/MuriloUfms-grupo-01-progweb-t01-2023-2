import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Default } from "./layouts/Default";
import { Quiz } from "./pages/Quiz";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Ranking } from "./pages/Ranking";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/ranking" element={<Ranking />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
