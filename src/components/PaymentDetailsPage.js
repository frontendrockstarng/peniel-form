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
      <h1 className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Registration Complete!</h1>
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>We await your payment</p>
      <p>Bank name: Wema Bank</p>
      <p>Account number: 0268786368</p>
      <p>Account name: Blessing Aniefiok</p>
      <div className='moreDetailsDiv'>
        <small className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>To confirm your payment</small>
        <a href='https://wa.me/2347059645041' className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Reach out via whatsapp</a> <br />
      </div>
      {/* <Link to="/">Home</Link> */}
    </div>
  );
};

export default PaymentDetailsPage;
