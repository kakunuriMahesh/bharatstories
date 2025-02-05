import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

import Footer from "../components/Footer"; // ✅ Corrected Footer import

const Layout = () => {

  return (
    <div>
      <Navbar />
      <main className="min-h-screen pt-[100px]">
        <Outlet/> {/* ✅ This renders the child components */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
