import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import RestPage from "components/Restaurant/RestPage";
import Basket from "components/Basket";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/restaurants/:slug" element={<RestPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
