import React from 'react';
import CreatableSelect from "react-select/creatable";

const Dropdown5 = () => {
  const options = [
    { value: "jack", label: "Loyang Point, 1.147km", color: "#FF8B00" },
    { value: "john", label: "Tampines 1, 1.494km", color: "#36B37E" },
    { value: "mike", label: "Tampines Mall, 1.638km", color: "#0052CC" },
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
      CreatableSelect placeholder={<div>Nearest Mall</div>} 

    />
  );
};

export default Dropdown5;
