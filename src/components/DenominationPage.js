import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const DenominationPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [denomination, setDenomination] = useState(userData.denomination || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "Now we know where you live. What church do you attend?";
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
    setDenomination(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!denomination.trim()) {
      setError('Please enter your church denomination');
      return;
    }

    // Update the denomination in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { denomination: denomination });
      console.log("Document updated with denomination: ", denomination);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    setUserData({ ...userData, denomination });
    navigate('/paymentstatus');
  };

  return (
    <div className="formDiv formHeading" id="denominationPageDiv">
      <h1>{typedText}</h1>
      <form onSubmit={handleSubmit}>
        <input className="normalInput"
          type="text"
          placeholder="Enter your church denomination"
          value={denomination}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/homeaddress">Previous</Link>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default DenominationPage;
