import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import PNF from "./Pages/PNF";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      {/* <h3 className="ms-2 mt-2"></h3> */}
      {/* header */}
      <header>
        <Header />
      </header>
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<PNF />} />
      </Routes>

      {/* footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
