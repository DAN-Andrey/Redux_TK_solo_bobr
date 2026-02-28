import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import OneArticlePage from "./pages/OneArticlePage/OneArticlePage";
import Layout from "./app/Layout/Layout";
import ProtectedRoute from "./shared/hoocs/ProtectedRoute/ProtectedRoute";
import SignUpForm from "./features/SignUpForm/SignUpForm";
import LoginForm from "./features/LoginForm/LoginForm";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./shared/hoocs/useReduxHooks/useReduxHooks";
import { refreshThunk } from "./entities/user/api/UserApi";

function App() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { user, isInitialized } = userState;
   console.log('=============app============', user ,isInitialized, userState);
  useEffect(() => {
    dispatch(refreshThunk());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={isInitialized}
                redirectTo="/blogs"
              />
            }
          >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAllowed={isInitialized}
                redirectTo="/login"
              />
            }
          >
            <Route path="/blogs" element={<ArticlePage />} />

            <Route
              path="/onearticle/:articleId"
              element={<OneArticlePage  />}
            />
          </Route>

          <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
