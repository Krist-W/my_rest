import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import RestPage from "components/Restaurant/RestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:slug" element={<RestPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
