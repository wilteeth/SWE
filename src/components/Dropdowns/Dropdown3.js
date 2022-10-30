import React, { useState, useEffect } from 'react'; // import the use state and use effect.
import CreatableSelect from "react-select/creatable";
// import Records from '.src/components/flatData.json';

const Dropdown1 = () => {
  const [flatData, setFlatData] = useState([]);  // flatData is used later in the div section, setFlatData is used here
  const url = 'https://mocki.io/v1/ec397210-3d68-4e76-87ba-ffde5812b2d5'; //Change URL to endpoint api
  async function pullJson(){
    const response = await fetch(url); // fetch the file url, but await it used to allow fetch to complete before putting it into variable response
    const responseData = await response.json() // We convert the response into a JSON object and store in reponse Data
    console.log(responseData); // Console log this is for me to check on developer option that we are pulling in the data from the server
    setFlatData(responseData); // Because responseData is a local variable in the function, pullJson, we need to store it in flatData variable to use later
    // Hence, the setFlatData stores this responseData in the user state thingy above
  }
    // On it's own, the pullJson function will not be called or run.
    // Hence, useEffect makes the function execute
    useEffect(() =>{
      pullJson();
    },[])

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };
  const handleChange = (selectedOption, actionMeta) => {
    console.log("handleChange", selectedOption, actionMeta);
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.log("handleInputChange", inputValue, actionMeta);
  };
  const [optioned, setoptions] = useState([]);


  return (
    <CreatableSelect
      options = {flatData}
      onChange={handleChange}
      onInputChange={handleInputChange}
      styles={colorStyles} 
      CreatableSelect placeholder={<div>Nearest Airport</div>} 

      />
  )
}

export default Dropdown1;