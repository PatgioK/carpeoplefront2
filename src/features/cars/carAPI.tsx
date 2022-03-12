import { CarsState } from "./carSlice";
import { API_URL } from "../people/peopleAPI";

export async function fetchCars() {
  return fetch(`${API_URL}/cars.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
  .catch((error) => {
      console.error("error:" , error)
      return {} as CarsState;
  })
}
