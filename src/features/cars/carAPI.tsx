import { CarDeleteData, CarFormData, CarsState, CarState } from "./carSlice";
import { API_URL } from "../people/peopleAPI";

export const fetchCars = async () => {
  return fetch(`${API_URL}/cars.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("error:", error);
      return {} as CarsState;
    });
};

export const createCar = async (payload: CarFormData) => {
  const car = payload.car;
  return fetch(`${API_URL}/cars.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("error: ", error);
      return {} as CarsState;
    });
};

export const destroyCar = async (payload: CarDeleteData) => {
  const car = payload.car;
  return fetch(`${API_URL}/cars/${car.car_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("error: ", error);
      return {} as CarsState;
    });
};

export const updateCar = async (payload: CarFormData) => {
  const car = payload.car;
  return fetch(`${API_URL}/cars/${car.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as CarState;
    });
};
