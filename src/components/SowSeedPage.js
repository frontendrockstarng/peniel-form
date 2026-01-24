// sowseedpage.js
import React, { useEffect, useState } from 'react';
import '../style.css'

const SowSeedPage = () => {
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
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>Kindly make payment to the following bank details to sow towards PENIEL</p>
      <p>Bank name: Vale Finance</p>
      <p>Account number: 1010950696</p>
      <p>Account name: Blessing Aniefiok</p>
      <div className='moreDetailsDiv'>
        <small className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>For further enquires</small>
        <a href='https://wa.me/2347059645041' className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Reach out via whatsapp</a> <br />
      </div>
      {/* <Link to="/">Home</Link> */}
    </div>
  );
};

export default SowSeedPage;
