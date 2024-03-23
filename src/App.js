// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcomepage from './components/Welcomepage';
import Namepage from './components/Namepage';
import EmailPage from './components/EmailPage';
import PhoneNumberPage from './components/PhoneNumberPage';
import HomeAddressPage from './components/HomeAddressPage';
import DenominationPage from './components/DenominationPage'; 
import PaymentStatusPage from './components/PaymentStatusPage';
import VerifyPayPage from './components/VerifyPayPage';
import PaymentDetailsPage from './components/PaymentDetailsPage';
import PayNowPage from './components/PayNowPage'; 
import ThankYouPage from './components/ThankYouPage';

const App = () => {
  const [userData, setUserData] = useState({});

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route
            path="/name"
            element={<Namepage userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/email"
            element={<EmailPage userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/phonenumber"
            element={<PhoneNumberPage userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/homeaddress"
            element={<HomeAddressPage userData={userData} setUserData={setUserData} />}
          />
           <Route
            path="/denomination"
            element={<DenominationPage userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/paymentstatus"
            element={<PaymentStatusPage userData={userData} setUserData={setUserData} />}
          />
           <Route path="/verifypay" element={<VerifyPayPage />} />
            <Route path="/paymentdetails" element={<PaymentDetailsPage />} />
            <Route path="/paynow" element={<PayNowPage />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
          {/* Add routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
