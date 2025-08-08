import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";

const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
);
export default App;
