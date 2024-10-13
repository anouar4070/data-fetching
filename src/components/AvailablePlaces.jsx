import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localHost:3000/placesss");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        //the error handler catches all errors and uses the default message "could not fetch places, please try again later." if no specific error message is available.
        setError({message: error.message || 'could not fetch places, please try again later.'});
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if(error) {
    return <Error title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}


  // useEffect(() => {
  //   fetch('http://localHost:3000/places').then((response) => {
  //     return response.json()
  //   })
  //   .then((resData) => {
  //     setAvailablePlaces(resData.places)
  //   })
  // }, [])