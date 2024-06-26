import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import CartPreview from "../Components/CartPreview";
import RoutesToTop from "../Components/RoutesToTop";
import SearchModal from "../Components/SearchModal";

const Layout = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-auto z-[-2] bg-gray-100 dark:bg-neutral-950">
      <Navbar />
      <RoutesToTop />
      <Outlet />
      <Footer />
      <CartPreview />
      <SearchModal />
    </div>
  );
};
export default Layout;
