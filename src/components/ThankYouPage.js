// ThankYouPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

const ThankYouPage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Simulating page load delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="formDiv"id="thankYouPage">
      <h1 className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Registration Complete!</h1>
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>See You at Peniel 6.0!!.</p>
      <div className='moreDetailsDiv'>
        <small className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>For further enquires</small>
        <a href='https://api.whatsapp.com/send?phone=2348028370487&text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Peniel' className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Reach out via whatsapp</a> <br />
      </div>
      {/* <Link to="/">Home</Link> */}
    </div>
  );
};

export default ThankYouPage;
