import Control from './components/Control/Control.jsx';
import React, { useState, useEffect } from "react";
//Imports_____________________________________________


//Vores hooks og state variabler. Bruges til at opdaterer og gemme fejlbeskeder
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");


  // Validering for almindeligt inputfelt
  useEffect(() => {
    if (inputValue.length > 0 && inputValue.length <= 6) {
      setInputError("Input skal være mere end 6 tegn langt."); //Viser error message og gå væk når vi skriver rigtig
    } else if (inputValue.length === 0) {
      setInputError("Input må ikke være tomt.");
    } else {
      setInputError(""); //Lige her
    }
  }, [inputValue]);

  // Validering for email inputfelt
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Ting som man skal have i en email input felt
    if (emailValue.length === 0) {
      setEmailError("Email må ikke være tom.");
    } else if (!emailRegex.test(emailValue)) {
      setEmailError("Indtast venligst en gyldig email-adresse.");
    } else {
      setEmailError(""); //Error go væk når du skriver en rigtig email med @ 
    }
  }, [emailValue]);


  //vores html med inline styling til errors og nogle text og event listeners
  return (
    <div>
      <Control />
      <div>
        <label>
          Indtast noget tekst (min. 7 tegn):
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        {inputError && <p style={{ color: "red" }}>{inputError}</p>} 
      </div>
        
      <div>
        <label>
          Indtast en gyldig email:
          <input
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)} //onChange lytter til ændringer i input velt og bryder det ned
            //e er Event listener, vi lytter på hvis der skrevet nådet in input feltet her med in arrow function
          />
        </label>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>
    </div>
  );
}
