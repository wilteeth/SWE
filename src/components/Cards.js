import React from 'react';
import './Cards.css';
import Records from '../flatData.json'

/*
{ 
  Records.map (record {
    return(

    )
  })
}
*/ 

function Cards() {
  return (
    <div className = 'wrapper_card'>  
      { 
        Records && Records.map (record => {
        return(
            
            <div className='cards'>
            <img className='cards__img' src = '/images/homewhite.png' alt="image"/>
            <div className='cards__body'>
              <p className = 'cards__predictedprice'> The predicted price is: ${record.PredictedPrice} </p>
              <p className = 'cards__description'>{record.flat_type} - {record.block} {record.street_name}     </p>
              <button className = 'cards__btn'> Add to Favourite </button>
            </div>
            </div>
            )
          })
        }
        </div>

  );
}

/*
function Cards(props) {
  return (
    <div className = 'wrapper_card'>
    <div className='cards'>
            <div className = 'box'>
            <img src = {props.img} className='cards_img'/>
            <div className='cards__body'>
              <p className = 'cards__predictedprice'> The predicted price is: xxxxx </p>
              <p className = 'cards__bedroom'>xxxxx    </p>
              <p className = 'cards__block'> xxxxx</p>
              <p className = 'cards__street'> xxxxx </p>
              <button className = 'cards__btn'> Add to Favourite </button>
            </div>
            </div>
        </div>
        </div>
  );
}
*/
/*
function Cards(props) {
  return (
    
    <div className='cards'>
      <img src = {props.img} className='cards_img'/>
      <div className='cards__body'>
        <h2 className = 'cards__predictedprice'> The predicted price is: {props.predictedprice} </h2>
        <h2 className = 'cards__bedroom'>{props.beedroom}       </h2>
        <h2 className = 'cards__block'> {props.block}</h2>
        <h2 className = 'cards__street'> {props.street} </h2>
        <button className = 'cards__btn'> Add to Favourite </button>
      </div>
    </div>
  );
}*/


export default Cards;
