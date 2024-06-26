import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const HomeAddressPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [homeAddress, setHomeAddress] = useState(userData.homeAddress || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const text = "Location Details - Share Your Full Address";
  const typingSpeed = 10; // milliseconds

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setHomeAddress(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!homeAddress.trim()) {
      setError('Please enter your home address');
      return;
    }

    setIsLoading(true); // Set loading to true when the form is submitted

    // Update the home address in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { homeAddress: homeAddress });
      console.log("Document updated with home address: ", homeAddress);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    setIsLoading(false); // Set loading to false after the home address is updated
    setUserData({ ...userData, homeAddress });
    navigate('/denomination');
  };

  return (
    <div className="formDiv formHeading" id="homeAddressPageDiv">
      <h1>{typedText}</h1>
      <form onSubmit={handleSubmit}>
        <input className="normalInput"
          type="text"
          placeholder="Type here"
          value={homeAddress}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/phonenumber">Previous</Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Next'} {/* Show CircularProgress when isLoading is true */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeAddressPage;
