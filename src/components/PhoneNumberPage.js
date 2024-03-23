import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const PhoneNumberPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "Got it, your email is in the books. Now, what's the best phone number to reach you at?";
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
    setPhoneNumber(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid Nigerian phone number');
      return;
    }

    // Update the phone number in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { phoneNumber: phoneNumber });
      console.log("Document updated with phone number: ", phoneNumber);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    setUserData({ ...userData, phoneNumber });
    navigate('/homeaddress');
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:\+?234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className="formDiv formHeading" id="phoneNumberPageDiv">
      <h1>{typedText}</h1>
      <form onSubmit={handleSubmit}>
        <input className="normalInput"
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/email">Previous</Link>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumberPage;
