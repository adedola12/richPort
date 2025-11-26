import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Nav />
      <main className="max-w-full mx-auto w-full px-4 py-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
