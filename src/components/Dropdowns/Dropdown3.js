import React from 'react';
import CreatableSelect from "react-select/creatable";

const Dropdown3 = () => {
  const options = [
    { label: "Changi International Airport Terminal 3 Playground, 3.053km", color: "#FF8B00" },
    { label: "Singapore Changi Airport, 3.679km", color: "#36B37E" },
    { label: "Singapore Changi Airport, 3.799km", color: "#0052CC" },
  ];
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

  return (
    <CreatableSelect
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
      styles={colorStyles} 
      CreatableSelect placeholder={<div>Nearest Airport</div>} 

    />
  );
};

export default Dropdown3;
