// PaymentDetailsPage.js
import React, { useEffect, useState } from 'react';
import '../style.css'

const PaymentDetailsPage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Simulating page load delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="formDiv" id="paymentDetailsPageDiv">
      <h1 className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Registration Almost Complete!</h1>
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>Kindly pay N15,000 to the following bank details to secure your camping spot</p>
      <p>Bank name: Wema Bank</p>
      <p>Account number: 0268786368</p>
      <p>Account name: Blessing Aniefiok</p>
      {/* <Link to="/">Home</Link> */}
    </div>
  );
};

export default PaymentDetailsPage;
