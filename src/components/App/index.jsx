import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Restaurant from "components/Restaurant";
import Cart from "components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <BrowserRouter>

      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants/:slug" element={<Restaurant />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
