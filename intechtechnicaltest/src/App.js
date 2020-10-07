import React, { useState } from "react";
import logo from "./logo.svg";
import CSVReader from "react-csv-reader";
import JumboTron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

//Code Created By Gareth Bevan

function App() {
  const [data, setData] = useState([]);
  const [targetNumber, setTargetNumber] = useState([]);

  const loadsCSV = (data, fileInfo) => {
    setData(data[0]);
    toast.success("CSV File Successfully Imported");
  };

  const handleSubmitPressed = () => {
    if (!data[0]) {
      toast.error("Please upload a valid CSV File");
      return;
    }
    if (!targetNumber || !parseInt(targetNumber)) {
      toast.error("Please enter a valid target number");
      return;
    }
    var numbers = data;
    var target = 532;
    numbers.forEach(function (value, i) {
      var remainingNumbers = [...numbers];
      remainingNumbers.splice(i, 1);
      var result = getOperations(remainingNumbers, value, target);
      if (result.success) {
        console.log(value + result.output);
        return;
      }
    });
  };

  const getOperations = (remainingNumbers, currentValue, target) => {
    var partResult = {};
    if (currentValue === target) {
      partResult.success = true;
      partResult.output = "";
      return partResult;
    }

    remainingNumbers.forEach(function (value, i) {
      var newList = [...remainingNumbers];
      newList.splice(i, 1);
      if (newList.length === 0) {
        if (currentValue - value === target) {
          partResult.success = true;
          partResult.output = "-" + value;
          return partResult;
        }
        if (currentValue + value === target) {
          partResult.success = true;
          partResult.output = "+" + value;
          return partResult;
        }
        if (currentValue * value === target) {
          partResult.success = true;
          partResult.output = "*" + value;
          return partResult;
        }
        if (currentValue / value === target) {
          partResult.success = true;
          partResult.output = "/" + value;
          return partResult;
        }

        partResult.success = false;
        partResult.output = "f" + value;
        return partResult;
      } else {
        partResult = getOperations(newList, currentValue - value, target);
        if (partResult.success) {
          partResult.output = "-" + value + partResult.output;
          return partResult;
        }
        partResult = getOperations(newList, currentValue + value, target);
        if (partResult.success) {
          partResult.output = "+" + value + partResult.output;
          return partResult;
        }
        partResult = getOperations(newList, currentValue * value, target);
        if (partResult.success) {
          partResult.output = "*" + value + partResult.output;
          return partResult;
        }
        partResult = getOperations(newList, currentValue / value, target);
        if (partResult.success) {
          partResult.output = "/" + value + partResult.output;
          return partResult;
        }
      }
    });

    return partResult;
  };

  const papaparseOptions = {
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const numbersUI = () => {
    if (data.length > 0) {
      return values;
    } else {
      return reader;
    }
  };

  const reader = (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Please Select a CSV file with numbers you need to use in the calculation"
        onFileLoaded={loadsCSV}
        parserOptions={papaparseOptions}
      />
    </div>
  );

  const values = (
    <div>
      <JumboTron>
        <p>The Available Numbers Are As Follows:</p>
        <h1>
          {data.map((item) => {
            return " " + item + " ";
          })}
        </h1>
      </JumboTron>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(e) => setTargetNumber(e.target.value)}
          placeholder="Target Value"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => handleSubmitPressed()}
          >
            Calculate!
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <JumboTron>
          <h1>Countdown Solver</h1>
          <p>A tool designed to solve the Countdown number puzzle</p>
        </JumboTron>
        {numbersUI()}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
