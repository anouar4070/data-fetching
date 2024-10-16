import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

// navigator.geolocation.getCurrentPosition((position) => {
//   const sortedPlaces = sortPlacesByDistance(
//     places,
//     position.coords.latitude,
//     position.coords.longitude
//   );
//   setAvailablePlaces(sortedPlaces);
//   setIsFetching(false);
// });

export default function AvailablePlaces({ onSelectPlace }) {

  const {
    isFetching,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
    error,
  } = useFetch(fetchAvailablePlaces, []);


  if (error) {
    return <Error title="An error occured!" message={error.message} />;
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

//& code without use of Custom Hook

// import { useEffect, useState } from "react";
// import Places from "./Places.jsx";
// import Error from "./Error.jsx";
// import { sortPlacesByDistance } from "../loc.js";
// import { fetchAvailablePlaces } from "../http.js";

// // const places = localStorage.getItem('places');

// export default function AvailablePlaces({ onSelectPlace }) {
//   const [isFetching, setIsFetching] = useState(false);
//   const [availablePlaces, setAvailablePlaces] = useState([]);
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchPlaces() {
//       setIsFetching(true);

//       try {
//         const places = await fetchAvailablePlaces();

//         navigator.geolocation.getCurrentPosition((position) => {
//           const sortedPlaces = sortPlacesByDistance(
//             places,
//             position.coords.latitude,
//             position.coords.longitude
//           );
//           setAvailablePlaces(sortedPlaces);
//           setIsFetching(false);
//         });
//       } catch (error) {
//         //the error handler catches all errors and uses the default message "could not fetch places, please try again later." if no specific error message is available.
//         setError({
//           message:
//             error.message || "could not fetch places, please try again later.",
//         });
//         setIsFetching(false);
//       }
//     }

//     fetchPlaces();
//   }, []);

//   if (error) {
//     return <Error title="An error occured!" message={error.message} />;
//   }

//   return (
//     <Places
//       title="Available Places"
//       places={availablePlaces}
//       isLoading={isFetching}
//       loadingText="Fetching place data..."
//       fallbackText="No places available."
//       onSelectPlace={onSelectPlace}
//     />
//   );
// }

// // useEffect(() => {
// //   fetch('http://localHost:3000/places').then((response) => {
// //     return response.json()
// //   })
// //   .then((resData) => {
// //     setAvailablePlaces(resData.places)
// //   })
// // }, [])
