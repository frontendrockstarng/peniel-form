// PayNowPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PayNowPage = () => {
  const navigate = useNavigate();

  const handlePaymentMade = () => {
    navigate('/thankyou'); // Navigate to the VerifyPayPage
  };

  return (
    <div className="formDiv"id="payNowYouPage">
      <h1>Make Payment Now</h1>
      <p>Please make payment to the following bank details:</p>
      <p>Bank name: Wema Bank</p>
      <p>Account number: 0268786368</p>
      <p>Account name: Blessing Aniefiok</p>
      <div className="pageBtnDiv" id="payNowBtnDiv">
          <Link to="/paymentstatus">Back</Link>
          <button onClick={handlePaymentMade}>I have made payment</button>
        </div>
    </div>
  );
};

export default PayNowPage;
