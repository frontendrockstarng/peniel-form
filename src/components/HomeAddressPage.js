import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const HomeAddressPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [homeAddress, setHomeAddress] = useState(userData.homeAddress || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "We won't call you at odd hours. Enter Your Home Address";
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

    // Update the home address in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { homeAddress: homeAddress });
      console.log("Document updated with home address: ", homeAddress);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

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
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default HomeAddressPage;
