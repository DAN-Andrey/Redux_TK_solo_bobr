import Navigation from "../../widgets/Navigation/Navigation";
import { Outlet } from "react-router";
import Container from "react-bootstrap/Container";
import Loader from "../../shared/hoocs/Loader/Loader";
import Footer from "../../widgets/Footer/Footer";
import { useAppSelector } from "../../shared/hoocs/useReduxHooks/useReduxHooks";

export default function Layout() {
  const userState = useAppSelector((state) => state.user);
  const { isInitialized } = userState;

  return (
    <>
      <Loader isLoading={!isInitialized}>
        <Container>
          <Navigation  />
          <Outlet />
          <Footer />
        </Container>
      </Loader>
    </>
  );
}
