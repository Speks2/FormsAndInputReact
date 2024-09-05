import Control from './components/Control/Control.jsx';
import React, { useState, useEffect } from "react";
//Imports_____________________________________________


//Vores hooks og state variabler. Bruges til at opdaterer og gemme fejlbeskeder
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [commentError, setCommentError] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  // Validation for Fulde Navn
  useEffect(() => {
    if (inputValue.length > 0 && inputValue.length <= 6) {
      setInputError("Input skal være mere end 6 tegn langt."); //Viser error message og gå væk når vi skriver rigtig
    } else if (inputValue.length === 0) {
      setInputError("Input må ikke være tomt.");
    } else {
      setInputError(""); //Lige her
    }
  }, [inputValue]);
  // Validering for almindeligt inputfelt

  // Validation for Telefonummer
  useEffect(() => {
    if (phoneValue.length > 0 && phoneValue.length < 8) { //Her vi gøre so vi kan skrive max 8 tal eller bostaver
      setPhoneError("Telefonnummer skal være mindst 8 cifre langt.");
    } else if (phoneValue.length === 0) {
      setPhoneError("Telefonnummer må ikke være tomt.");
    } else {
      setPhoneError("");
    }
  }, [phoneValue]);

  // Validation for Email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue.length === 0) {
      setEmailError("Email må ikke være tom.");
    } else if (!emailRegex.test(emailValue)) {
      setEmailError("Indtast venligst en gyldig email-adresse.");
    } else {
      setEmailError("");
    }
  }, [emailValue]);

  // Validation for Kommentar
  useEffect(() => {
    if (commentValue.length > 0 && commentValue.length < 20) {
      setCommentError("Kommentar skal være mindst 20 tegn.");
    } else {
      setCommentError("");
    }
  }, [commentValue]);

  // Handle Submit
  const handleSubmit = () => {
    if (!inputError && !phoneError && !emailError && !commentError) {
      setSubmittedData({
        inputValue,
        phoneValue,
        emailValue,
        commentValue,
        preferredContact,
      });
    }
  };

  // Handle Reset
  const handleReset = () => {
    setInputValue("");
    setPhoneValue("");
    setEmailValue("");
    setCommentValue("");
    setPreferredContact("");
    setSubmittedData(null);
  };

 //vores html med inline styling til errors og nogle text og event listeners

  return (
    <div>
      <Control />
      <div>
        Fulde Navn
        <label>
          Indtast Fulde Navn (min. 7 tegn):
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} //onChange lytter til ændringer i input velt og bryder det ned
            //e er Event listener, vi lytter på hvis der skrevet nådet in input feltet her med in arrow function
          />
        </label>
        {inputError && <p style={{ color: "red" }}>{inputError}</p>}
      </div>

      <div>
        Telefonnummer
        <label>
          Indtast Telefonummer (min. 8 tal):
          <input
            type="text"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
          />
        </label>
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
      </div>

      <div>
        Email
        <label>
          Indtast en gyldig email:
          <input
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </label>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>

      <div>
        Kommentar
        <label>
          Kommentar (min. 20 bogstaver):
          <textarea
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
        </label>
        {commentError && <p style={{ color: "red" }}>{commentError}</p>}
      </div>

      <div>
        Foretrukken kontaktmetode:
        <label>
          <input
            type="radio"
            name="contactMethod"
            value="telefon"
            checked={preferredContact === "telefon"}
            onChange={(e) => setPreferredContact(e.target.value)}
          />
          Telefon
        </label>
        <label>
          <input
            type="radio"
            name="contactMethod"
            value="email"
            checked={preferredContact === "email"}
            onChange={(e) => setPreferredContact(e.target.value)}
          />
          Email
        </label>
      </div>

      <button onClick={handleSubmit}>Send</button>
      <button onClick={handleReset}>Nulstil</button>

      {submittedData && (
        <div>
          <h3>Indsendte Data</h3>
          <p>Fulde Navn: {submittedData.inputValue}</p>
          <p>Telefonnummer: {submittedData.phoneValue}</p>
          <p>Email: {submittedData.emailValue}</p>
          <p>Kommentar: {submittedData.commentValue}</p>
          <p>Foretrukken kontaktmetode: {submittedData.preferredContact}</p>
        </div>
      )}
    </div>
  );
}
