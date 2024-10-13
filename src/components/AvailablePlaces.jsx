
import { useState } from 'react';
import Places from './Places.jsx';


// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {

const [availablePlaces, setAvailablePlaces] = useState([]);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
