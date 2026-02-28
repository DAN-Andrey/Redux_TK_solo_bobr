import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, NavLink } from "react-router";
import "./Navigation.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hoocs/useReduxHooks/useReduxHooks";
import { signOutThunk } from "../../entities/user/api/UserApi";


export default function Navigation() {
  const Navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);
  const { user, isInitialized } = userState;
  const dispatch = useAppDispatch();

  console.log("============NavPage=============", user, isInitialized);

  const logOutHandler = async () => {
    try {
      dispatch(signOutThunk());
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="secondary" data-bs-theme="dark">
      <Container>
        <span className="fs-3 me-2">🎸</span>
        <span className="fw-bold">Rock Storyteller</span>
        <br />

        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Главная
          </NavLink>
          <NavLink to="/blogs" className="nav-link">
            Блог
          </NavLink>

          {/* <NavLink to="/articles" className="nav-link" onClick={loginHandler}>
            Articles
          </NavLink> */}
        </Nav>

        {isInitialized && (
          <>
            <NavLink
              to="/login"
              className="nav-link"
              style={{ color: "white", marginRight: "10px" }}
            >
              Вход
            </NavLink>
            <NavLink
              to="/signup"
              className="nav-link"
              style={{ color: "white" }}
            >
              Регистрация
            </NavLink>
          </>
        )}

        {isInitialized && user && (
          <>
            <span className="nav-userName">{user.name}</span>
            <Button variant="secondary" onClick={logOutHandler}>
              Выход
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
}
