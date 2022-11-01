import React, { Component, useState, useEffect } from 'react';
import './Compare.css';
import Select from "react-select";
// const API_KEY = "AIzaSyDCaF--dfltEOplepPD4r12MFla5lrv6gA"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
//import { findByLabelText } from '@testing-library/react';
//import Records from './Compareprice.json';

export default function Comparecomponent() {
    const [search_val1, setSearchVal1] = React.useState("");
    const [search_val2, setSearchVal2] = React.useState("");
    const [flat_type1, setFlatType1] = React.useState("");
    const [flat_type2, setFlatType2] = React.useState("");
    const [address1, setAddress1] = React.useState("");
    const [address2, setAddress2] = React.useState("");
    const [coordinates1, setCoordinates1] = React.useState({
        lat: null,
        lng: null
    });
    const [coordinates2, setCoordinates2] = React.useState({
        lat: null,
        lng: null
    });
    const options = [
        { value: "1", label: "1 Room" },
        { value: "2", label: "2 Room" },
        { value: "3", label: "3 Room" },
        { value: "4", label: "4 Room" },
        { value: "5", label: "5 Room" },
    ];
    const handleChangeLeft = selectedOption => {
        // console.log('handleChangeLeft', selectedOption.value);
        setFlatType1(selectedOption.value)
    };
    const handleChangeRight = selectedOption => {
        //console.log('handleChangeRight', selectedOption.value);
        setFlatType2(selectedOption.value)
    };
    console.log('room left', flat_type1);
    console.log('room right', flat_type2);



    const handleSelect1 = async value1 => {
        const results1 = await geocodeByAddress(value1);
        const latLng1 = await getLatLng(results1[0]);
        //console.log(latLng);
        setAddress1(value1);
        setCoordinates1(latLng1);
        // console.log("Latitude", latLng["lat"]);
        // console.log("Longditude", latLng["lng"]);
        setSearchVal1(value1);
        //console.log("Location", value);
    };
    console.log("Location Left", search_val1);

    const handleSelect2 = async value2 => {
        const results2 = await geocodeByAddress(value2);
        const latLng2 = await getLatLng(results2[0]);
        //console.log(latLng);
        setAddress2(value2);
        setCoordinates2(latLng2);
        // console.log("Latitude", latLng["lat"]);
        // console.log("Longditude", latLng["lng"]);
        setSearchVal2(value2);
        //console.log("Location", value);
    };
    console.log("Location Right", search_val2);

    const [flatData1, setFlatData1] = useState([]);  // flatData is used later in the div section, setFlatData is used here
    const [flatData2, setFlatData2] = useState([]);  // flatData is used later in the div section, setFlatData is used here
    const url1 = 'https://mocki.io/v1/e3a01fd8-4ac5-4387-a7f1-0efd6aedcc1d'; //Change URL to endpoint api
    const url2 = 'https://mocki.io/v1/e3a01fd8-4ac5-4387-a7f1-0efd6aedcc1d'; //Change URL to endpoint api


    async function pullJson() {
        const response1 = await fetch(url1); // fetch the file url, but await it used to allow fetch to complete before putting it into variable response
        const responseData1 = await response1.json() // We convert the response into a JSON object and store in reponse Data
        const response2 = await fetch(url2); // fetch the file url, but await it used to allow fetch to complete before putting it into variable response
        const responseData2 = await response2.json() // We convert the response into a JSON object and store in reponse Data
        console.log(responseData1); // Console log this is for me to check on developer option that we are pulling in the data from the server
        setFlatData1(responseData1); // Because responseData is a local variable in the function, pullJson, we need to store it in flatData variable to use later
        console.log(responseData2); // Console log this is for me to check on developer option that we are pulling in the data from the server
        setFlatData2(responseData2); // Because responseData is a local variable in the function, pullJson, we need to store it in flatData variable to use later
        // Hence, the setFlatData stores this responseData in the user state thingy above
    }
    // On it's own, the pullJson function will not be called or run.
    // Hence, useEffect makes the function execute
    useEffect(() => {
        pullJson();
    }, [])

    // async function givemetheprice1(search_val1, flat_type1) {
    //     //console.log('http://127.0.0.1:8000/api/comparison/?search_val='+search_val+'&flat_type=' + flat_type1);
    //     const response1 = await fetch('http://127.0.0.1:8000/api/comparison/?search_val=' + search_val1 + '&flat_type=' + flat_type1, {
    //         method: 'POST',
    //     })
    //     const responseData1 = await response1.json()
    //     console.log(responseData1); // Console log this is for me to check on developer option that we are pulling in the data from the server
    //     setFlatData1(responseData1);
    // }
    // async function givemetheprice2(search_val2, flat_type2) {
    //     //console.log('http://127.0.0.1:8000/api/comparison/?search_val='+search_val+'&flat_type=' + flat_type1);
    //     const response2 = await fetch('http://127.0.0.1:8000/api/comparison/?search_val=' + search_val2 + '&flat_type=' + flat_type2, {
    //         method: 'POST',
    //     })
    //     const responseData2 = await response2.json()
    //     console.log(responseData2); // Console log this is for me to check on developer option that we are pulling in the data from the server
    //     setFlatData2(responseData2);
    // }

    async function givemetheprice1(search_val1, flat_type1) {
        //console.log('http://127.0.0.1:8000/api/comparison/?search_val='+search_val+'&flat_type=' + flat_type1);
        fetch('http://127.0.0.1:8000/api/comparison/?search_val=' + search_val1 + '&flat_type=' + flat_type1, {
            method: 'POST',
        })
    }
    async function givemetheprice2(search_val2, flat_type2) {
        //console.log('http://127.0.0.1:8000/api/comparison/?search_val='+search_val+'&flat_type=' + flat_type1);
        fetch('http://127.0.0.1:8000/api/comparison/?search_val=' + search_val2 + '&flat_type=' + flat_type2, {
            method: 'POST',
        })
    }


    return (
        <div id='comparebody'>
            <h1 id='compareheader'>Comparison</h1>
            <div id='comparefunction'>
                <div id='comparefunction1'>
                    <img id='image1' src='https://cdn-icons-png.flaticon.com/512/2163/2163350.png' alt='home image' height={100} width={100}></img>
                    <div id='compareform1'>
                        <div>Location:</div>
                        <div>
                            <PlacesAutocomplete
                                value={address1}
                                onChange={setAddress1}
                                onSelect={handleSelect1}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>

                                        {/* <p>Latitude: {coordinates.lat}</p>
                                        <p>Longitude: {coordinates.lng}</p> */}

                                        <input id='locationsearch1' {...getInputProps({ placeholder: "Type address" })} />

                                        <div id='suggestionbox'>
                                            {loading ? <div>...loading</div> : null}
                                            <div id='suggestionindiv'>
                                                {suggestions.map(suggestion => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#FF0000" : "#808080",
                                                        //position: "absolute",
                                                        //display: "flex",
                                                        //flexDirection: "column",
                                                    };

                                                    return (
                                                        <div {...getSuggestionItemProps(suggestion, { style })}>
                                                            {suggestion.description}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                        <div id='header'>Room Size:</div>
                        <Select id='dropdownbar' options={options} onChange={handleChangeLeft} />
                        <button id='givemetheprice' onClick={e => givemetheprice1(search_val1, flat_type1)} > Find Price </button>
                        <div id='header'>Price Now:</div>
                        <div>
                            {
                                flatData1 && flatData1.map((record) => {

                                    return (
                                        <div id='pricenow'>
                                            ${(record.PredictedPrice)}
                                        </div>
                                    )


                                })
                            }
                        </div>
                    </div>
                </div>
                <img id='imagemid' src='https://cdn-icons-png.flaticon.com/512/6793/6793731.png' alt='vs image' height={100} width={100}></img>
                <div id='comparefunction2'>
                    <img id='image1' src='https://cdn-icons-png.flaticon.com/512/2163/2163350.png' alt='home image' height={100} width={100}></img>
                    <div id='compareform1'>
                        <div>Location:</div>
                        <PlacesAutocomplete
                            value={address2}
                            onChange={setAddress2}
                            onSelect={handleSelect2}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>

                                    {/* <p>Latitude: {coordinates.lat}</p>
                                        <p>Longitude: {coordinates.lng}</p> */}

                                    <input id='locationsearch2' {...getInputProps({ placeholder: "Type address" })} />

                                    <div id='suggestionbox'>
                                        {loading ? <div>...loading</div> : null}
                                        <div id='suggestionindiv'>
                                            {suggestions.map(suggestion => {
                                                const style = {
                                                    backgroundColor: suggestion.active ? "#FF0000" : "#808080",
                                                    //position: "absolute",
                                                    //display: "flex",
                                                    //flexDirection: "column",
                                                };

                                                return (
                                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                                        {suggestion.description}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <div id='header'>Room Size:</div>
                        <Select id='dropdownbar' options={options} onChange={handleChangeRight} />
                        <button id='givemetheprice' onClick={e => givemetheprice2(search_val2, flat_type2)} > Find Price </button>
                        <div id='header'>Price Now:</div>
                        <div>
                            {
                                flatData2 && flatData2.map((record) => {

                                    return (
                                        <div id='pricenow'>
                                            ${(record.PredictedPrice)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
