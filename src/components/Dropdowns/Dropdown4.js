import React from 'react';
import CreatableSelect from "react-select/creatable";

const Dropdown4 = () => {
  const options = [
    { value: "jack", label: "Alsalam Restaurant, 0.470km", color: "#FF8B00" },
    { value: "john", label: "Istanbul Seafood, 0.537km", color: "#36B37E" },
    { value: "mike", label: "Chok Dee Thai Food Mookata, 0.825km", color: "#0052CC" },
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
      CreatableSelect placeholder={<div>Nearest Eatry</div>} 

    />
  );
};

export default Dropdown4;
