export async function fetchAvailablePlaces() {
  const response = await fetch("http://localHost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localHost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.message;
}


export async function fetchUserPlaces() {
  const response = await fetch("http://localHost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData.places;
}













/**
 * When an error is thrown, the function immediately stops executing, and the error is handled by any error handling mechanisms in place (e.g., a try...catch block).
 *
 */
