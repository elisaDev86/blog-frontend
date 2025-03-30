import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginForm from "./Pages/LoginForm/LoginForm";
import RegisterForm from "./Pages/RegisterForm/RegisterForm";
import HomePage from "./Pages/Home/HomePage";
import CreatePostPage from "./Pages/CreatePostPage/CreatePostPage";
import EditPostPage from "./Pages/EditPostPage/EditPostPage";
import { UserProvider } from "./context/UserContext";
import { ProtectedRouterProvider } from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const shouldShowNavbarFooter = !["/login", "/register"].includes(
    location.pathname
  );

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Rotte protette */}
        <Route
          path="/create-new-post"
          element={
            <ProtectedRouterProvider> 
              <CreatePostPage />
            </ProtectedRouterProvider>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRouterProvider>
              <EditPostPage />
            </ProtectedRouterProvider>
          }
        />
      </Routes>
      {shouldShowNavbarFooter && <Footer />}
    </>
  );
}

export default App;
