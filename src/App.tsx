import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import Chat from "./Chat";
import useAuth from "./firebase/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="*" element={user ? <Chat /> : <Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
