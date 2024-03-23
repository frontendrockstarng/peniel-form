import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const EmailPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(userData.email || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = `Welcome aboard, ${userData.name}! Next, I'll need your email address. We wouldn't want you to miss any heavenly updates!`;
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
    setEmail(e.target.value);
    setError('');
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
    navigate('/phonenumber');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default EmailPage;
