import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, CircularProgress } from '@mui/material'; // Import CircularProgress
import { styled } from '@mui/system';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const EmailPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(userData.email || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const text = `Welcome aboard, ${userData.name}! Next,  Provide your email address to stay updated.`;
  const typingSpeed = 10; // milliseconds

  // Function to simulate typing effect
  const typeText = () => {
    if (currentIndex < text.length) {
      setTypedText((prevText) => prevText + text.charAt(currentIndex));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const typingInterval = setInterval(typeText, typingSpeed);
    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true); // Set loading to true when the form is submitted

    // Update the email in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { email: email });
      console.log("Document updated with email: ", email);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    setUserData({ ...userData, email });
    setIsLoading(false); // Set loading to false after the email is updated
    navigate('/phonenumber');
  };

  return (
    <div className="formDiv formHeading" id="emailPageDiv">
      <h1>{typedText}</h1>
      <form onSubmit={handleSubmit}>
        <input className="normalInput"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/name">Previous</Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Next'} {/* Show CircularProgress when isLoading is true */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailPage;
