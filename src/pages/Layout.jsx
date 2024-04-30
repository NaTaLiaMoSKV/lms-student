import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import MobileMenu from "components/MobileMenu";
import Footer from "components/Footer";

const Layout = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="wrapper">
      {isMobile ? <MobileMenu /> : <Navigation />}

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <ToastContainer autoClose={2000} pauseOnHover />
      <Footer />
    </div>
  );
};

export default Layout;
