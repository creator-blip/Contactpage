import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Otp from './Components/Otp';
import Testimonial from './Components/Testimonial';
import Thankyou from './Components/Thankyou';
import Home from './Pages/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;   