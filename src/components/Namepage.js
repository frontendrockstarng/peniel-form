import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Namepage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(userData.name || '');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter your name');
      return;
    }

    // Save the name to Firebase
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, "users");
    try {
      const docRef = await addDoc(usersCollection, { name: name });
      console.log("Document written with ID: ", docRef.id);
      setUserData({ ...userData, name, id: docRef.id });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    navigate('/email');
  };

  return (
    <div className="formDiv formHeading" id="namePageDiv">
      <h1>Fantastic! Let's get you registered for Camp PENIEL. What's your full name?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="normalInput"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <div className="pageBtnDiv">
          <Link to="/">Previous</Link>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Namepage;
