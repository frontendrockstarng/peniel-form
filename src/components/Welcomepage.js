import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import '../style.css'

const WelcomePage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add this line

  useEffect(() => {
    // Simulating page load delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartRegistration = async () => {
    setIsLoading(true);
    // Simulate a delay before navigating to the next page
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/name');
    setIsLoading(false);
  };

  return (
    <div className="formDiv"id="welcomePageDiv">
      <h1 className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Welcome to PENIEL 6.0</h1>
      <p className={`fade-up-p ${loaded ? 'fade-up' : ''}`}>Gear up for divine impartation! Just a form away from securing your spot at PENIEL.</p>
      <div className='moreDetailsDiv'>
        <small className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Location - Redemption Camp</small> <br />
        <small className={`fade-up-h1 ${loaded ? 'fade-up' : ''}`}>Duration - June 14, 2024 - June 17, 2024</small>
      </div>
      <Link to="/name" id="welcomeBtnLink" className={`fade-up-button ${loaded ? 'fade-up' : ''}`}>
        <button id="welcomeBtn" onClick={handleStartRegistration} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Start registration'} {/* Show CircularProgress when isLoading is true */}
        </button>
      </Link>
    </div>
  );
};

export default WelcomePage;
