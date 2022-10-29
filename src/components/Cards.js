import React, { useState, useEffect } from 'react'; // import the use state and use effect.
import './Cards.css';


function Cards() {

  // Function starts here
  const [flatData, setFlatData] = useState([]);  // flatData is used later in the div section, setFlatData is used here
  const url = 'https://mocki.io/v1/e3a01fd8-4ac5-4387-a7f1-0efd6aedcc1d'; //Change URL to endpoint api

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

  return (
    <div className = 'wrapper_card'>  
      { 
        // Using the flatData global variable, we can map, and each item, we call it record. 
        // record is the iterator like i.
        flatData.map (record => {  // NEED THIS line!!
        return(
            
            <div className='cards'>
            <img className='cards__img' src = '/images/homewhite.png' alt="image"/>
            <div className='cards__body'>
              <p className = 'cards__predictedprice'> The predicted price is: ${record.PredictedPrice} </p>
              <p className = 'cards__description'>{record.flat_type} - {record.block} {record.street_name}  </p>

              <button className = 'cards__btn'> Add to Favourite </button> 
            </div>
            </div>
            )
          })
        }
        </div>

  );
}
export default Cards;
