import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  margin-top: 10px;
`;

const NumberButton = styled.button`
  padding: 10px;
  font-size: 26px;
  background-color: ${(props) => (props.clicked ? "#e74c3c" : "#3498db")};
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-left: 10px;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
`;

const ResultItem = styled.div`
  margin: 5px;
`;

const ClearButton = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-left: 10px;
`;

const Title = styled.h1`
font-size: 30px;
margin-bottom: 10px;
`;
function NumbersBlock() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const minNumber = 1;
  const maxNumber = 100;
  const totalButtonNumbers = 9;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const generateRandomNumbers = () => {
    const shuffledNumbers = [];

    while(shuffledNumbers.length < totalButtonNumbers) {
      const randomNumber = getRandomInt(minNumber, maxNumber);

      if(!shuffledNumbers.includes(randomNumber)){
        shuffledNumbers.push(randomNumber)
      }
    }

    setRandomNumbers(shuffledNumbers)
  };


  const checkIfSorted = () => {
    const isCorrectOrder = clickedNumbers.every(
      (number, index, array) => index === 0 || array[index - 1] <= number
    );

    return isCorrectOrder;
  };

  const handleButtonClick = (number) => {
    let updatedClickedNumbers;
    if (!submitted) {
      if (clickedNumbers.includes(number)) {
        // Number is already clicked, unclick it
        updatedClickedNumbers = clickedNumbers.filter((num) => num !== number);
        console.log(`Button ${number} unclicked!`);
      } else {
        // Number not clicked before, click it
        updatedClickedNumbers = [...clickedNumbers, number];
        console.log(`Button ${number} clicked!`);
      }
    }

    setClickedNumbers(updatedClickedNumbers);
  };

  const handleSubmit = () => {
    if (!submitted) {
      if (clickedNumbers.length === randomNumbers.length) {
        setSubmitted(true);

        if (checkIfSorted()) {
          alert(`Congratulations! You sorted the numbers correctly in ${timer} seconds!`);
        } else {
          alert("Try again. The numbers are not sorted correctly.");
        }
      } else {
        alert("You need to sort all numbers before submitting.");
      }
    }
  };

  const handleReset = () => {
    setClickedNumbers([])
    setTimer(0)
  }

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    let interval;
    if (!submitted) {
      interval = setInterval(() => { //  This sets up an interval that increments the timer every second
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval); // This is the cleanup function
  }, [submitted]);

  return (
    <>
      <div>
        <Title>Sort the numbers game</Title>
        <p>Timer: {timer} seconds</p>
      </div>
      <ButtonContainer>
        {randomNumbers.map((number) => (
          <NumberButton
            key={number}
            clicked={clickedNumbers.includes(number)}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </NumberButton>
        ))}
      </ButtonContainer>

      <ResultContainer>
        <p>The sorted numbers :</p>
        {clickedNumbers.map((number, index) => (
          <ResultItem key={index}>{number}</ResultItem>
        ))}
      </ResultContainer>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      <ClearButton onClick={handleReset}>Reset</ClearButton>
    </>
  );
}

export default NumbersBlock;
