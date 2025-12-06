import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Nav />

      <ScrollToTop />
      {/* full width + 4px horizontal padding */}
      <main className="w-full px-[4px] pt-28 pb-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
