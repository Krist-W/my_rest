import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Restaurant from "components/Restaurant";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
   return (
  
        <BrowserRouter>
            <Header />
            <div className="">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants/:slug" element={<Restaurant />} />
            </Routes>
            </div>
            <Footer />
        </BrowserRouter>
 
    );

}

export default App;
