
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

const WelcomePage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Simulating page load delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="formDiv"id="welcomePageDiv">
      <h1 className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Welcome to PENIEL 6.0</h1>
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>Gear up for divine fun! Just a form away from securing your spot at Camp PENIEL.</p>
      <Link to="/name" id="welcomeBtnLink" className={`fade-up-button ${loaded ? 'fade-up' : ''}`}>
        <button id="welcomeBtn">Start registration</button>
      </Link>
    </div>
  );
};

export default WelcomePage;