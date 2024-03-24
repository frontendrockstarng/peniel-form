import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import firebaseApp from '../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const StyledInput = styled('input')({
  display: 'none',
});

const VerifyPayPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const textToType = "Nice of you! Upload Proof of Payment";

  // Function to simulate typing effect
  const typeText = () => {
    if (currentCharIndex < textToType.length) {
      setTypedText((prevText) => prevText + textToType.charAt(currentCharIndex));
      setCurrentCharIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const typingInterval = setInterval(typeText, 10);
    return () => clearInterval(typingInterval);
  }, [currentCharIndex]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError('File size should not exceed 2MB');
      } else if (!['image/png', 'application/pdf', 'image/jpg'].includes(selectedFile.type)) {
        setError('Invalid file format. Only PNG and PDF files are allowed');
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Check if userData and userData.id exist
    if (!userData || !userData.id) {
      console.error("userData or userData.id is undefined");
      return;
    }

    // Upload the file to Firebase Storage
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, 'payments/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle the upload progress
      }, 
      (error) => {
        console.error("Error uploading file: ", error);
      }, 
      async () => {
        // Handle successful upload
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          // Update the payment proof in Firebase
          const db = getFirestore(firebaseApp);
          const userDoc = doc(db, "users", userData.id);
          await updateDoc(userDoc, { paymentProof: downloadURL });
          console.log("Document updated with payment proof: ", downloadURL);

          setUserData({ ...userData, paymentProof: downloadURL });
          navigate('/thankyou');
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    );
  };

  return (
    <div className="formDiv formHeading" id="verifyPayPageDiv">
      <Typography variant="h1">{typedText}</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">
          <StyledInput
            id="file-upload"
            type="file"
            onChange={handleChange}
            accept=".pdf,.png"
          />
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <TextField
          id="file-name"
          label="Cant upload more than 2MB"
          value={fileName}
          disabled
          variant="outlined"
          fullWidth
          margin="normal"
          className="fileInputText"
        />
        {error && <Typography style={{ color: 'red', fontSize: '12px' }}>{error}</Typography>}
        <div className="pageBtnDiv">
          <Link to="/paymentstatus">Previous</Link>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPayPage;
