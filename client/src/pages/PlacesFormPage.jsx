import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoUploader from '../PhotoUploader';
import { Link, Navigate, useParams } from 'react-router-dom';
import AccountNav from './AccountNav';
import countries from 'countries-list';
import countryList from 'react-select-country-list'
import Select from 'react-select';
import { useMemo } from "react";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [address, setAddress] = useState('');
  const [positiveThings, setPositiveThings] = useState('');
  const [negativeThings, setNegativeThings] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const options = useMemo(() => countryList().getData(), []);
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, SetState] = useState('');
  const [city, SetCity] = useState('');
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get('places/' + id).then(response => {
      const { data } = response;
        console.log(data);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setExtraInfo(data.extraInfo);
      setPositiveThings(data.positiveThings);
      setNegativeThings(data.negativeThings);
      
      setSelectedCountry(data.country);
      SetState(data.state);
      SetCity(data.city);
      setPostalCode(data.postalCode);
      setLocation(data.location);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className='text-xl mt-4 mx-1'>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-gray-400 text-m'>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();

  
    // Check if all inputs are filled
    if (
      !address ||
      !positiveThings ||
      !negativeThings ||
      !extraInfo ||
      addedPhotos.length === 0 ||
      !selectedCountry ||
      !location ||
      !postalCode ||
      !state ||
      !city
    ) {
      setValidationError(true);
      return;
    }

    const placeData = {
      address,
      positiveThings,
      negativeThings,
      extraInfo,
      photos: addedPhotos,
      city,
      state,
      postalCode,

      country: selectedCountry.label, // Correctly extracting the country value
      location
    };  
    
    

    if (id) {
      // Update
      await axios.put('/places/' + id, {
        id,
        ...placeData
      });
      console.log('DONE');
      setRedirect(true);
    } else {
      // Add new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  const changeHandler = value => {
    setSelectedCountry(value);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  function preInput(header, description, required = false) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
        {required && <span className="text-red-500">*</span>}
      </>
    );
  }
  
  // ...
  
  return (
    <>
      <div>
        <AccountNav />
        <form className="bg-gray-200" onSubmit={savePlace}>
          <div className="">
            {/* Address Section */}
            <h1 className="text-center font-bold text-3xl italic text-black">Address Section</h1>
  
            <div className="grid grid-cols-2">
              <div>
                {preInput("Country", "", true)}
                <Select className="border" options={options} value={selectedCountry} onChange={changeHandler} placeholder="Country" />
              </div>
              <div>
                {preInput("State/Province/Region", "", true)}
                <input type="text" value={state} onChange={(e) => SetState(e.target.value)} />
              </div>
              <div>
                {preInput("City", "", true)}
                <input type="text" value={city} onChange={(e) => SetCity(e.target.value)} />
              </div>
              <div>
                {preInput("Zip / Postal Code", "", true)}
                <input className="w-half border rounded-2xl text-center" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>
            </div>
  
            {preInput("Location", "Put your Location here, this location will be integrated with Google Maps ", true)}
            <textarea type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your Google Maps Location/ Area / Flat" />
  
            {preInput("Address", "Put full address of the place Here", true)}
            <textarea type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Near ABC Market, opposite to xyz Sector" />
          </div>
  
          {/* Second Section */}
          <div className="">
            <h1 className="text-center font-bold text-3xl italic text-black">'About Post' Section</h1>
            {preInput("Photos", "Goods and Bads of the Place, more = better", true)}
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
  
            <h2 className="text-xl mt-4 mx-1 text-black">Description</h2>
            <p className="text-gray-500 text-sm text-black">Share Description about place / society / your experience</p>
            <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
            
            <h2 className="text-xl mt-4 mx-1 text-black">Positive Things</h2>
            <p className="text-gray-500 text-sm text-black">List things you like about the place</p>
            <textarea className="" value={positiveThings} onChange={(e) => setPositiveThings(e.target.value)} />
  
            <h2 className="text-xl mt-4 mx-1 text-black">Negative Things</h2>
            <p className="text-gray-500 text-sm text-black">List things you don't like about the place</p>
            <textarea className="border border-red-600" value={negativeThings} onChange={(e) => setNegativeThings(e.target.value)} />
  
          </div>
          {validationError && <p className="text-red-500">Please fill in all the required fields.</p>}
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
}

export default PlacesFormPage;
