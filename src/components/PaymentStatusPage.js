import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const PaymentStatusPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(userData.paymentStatus || '');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const text = "Your church is noted. Have you paid for Peniel? It cost N15,000 as it would be held at Redemption camp.";
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
    setPaymentStatus(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentStatus.trim()) {
      setError('Please select your payment status');
      return;
    }

    setIsLoading(true); // Set loading to true when the form is submitted

    // Update the payment status in Firebase
    const db = getFirestore(firebaseApp);
    const userDoc = doc(db, "users", userData.id);
    try {
      await updateDoc(userDoc, { paymentStatus: paymentStatus });
      console.log("Document updated with payment status: ", paymentStatus);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    setIsLoading(false); // Set loading to false after the payment status is updated
    setUserData({ ...userData, paymentStatus });
    if (paymentStatus === 'paid') {
      navigate('/verifypay');
    } else if (paymentStatus === 'pay_later') {
      navigate('/paymentdetails');
    } else if (paymentStatus === 'pay_now') {
      navigate('/paynow');
    }
  };

  return (
    <div className="formDiv formHeading" id="paymentStatusPageDiv">
      <h1>{typedText}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              className="radioInput"
              type="radio"
              value="paid"
              checked={paymentStatus === 'paid'}
              onChange={handleChange}
            />
            <span className="radioText">Yes, I have Paid</span> 
          </label>
        </div>
        <div>
          <label>
            <input
              className="radioInput"
              type="radio"
              value="pay_later"
              checked={paymentStatus === 'pay_later'}
              onChange={handleChange}
            />
            <span className="radioText"> No, I Will Pay Later</span> 
          </label>
        </div>
        <div>
          <label>
            <input
              className="radioInput"
              type="radio"
              value="pay_now"
              checked={paymentStatus === 'pay_now'}
              onChange={handleChange}
            />
            <span className="radioText">I want to pay now</span> 
          </label>
        </div>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/denomination">Previous</Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Next'} {/* Show CircularProgress when isLoading is true */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStatusPage;
