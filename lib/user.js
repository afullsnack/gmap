import "isomorphic-fetch";
import { url } from "lib/config";

// login user api call
export const login = async ({ username, password }) => {
  const { data, error } = await fetch(`${url}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

  console.assert(data.error == null, data.error);
  console.assert(data.message == null, data.message);

  if (data.message !== null) return [data, null];
  return [null, error];
};

// creates new users account api call
export const createAccount = async ({
  firstname,
  lastname,
  username,
  email,
  password,
}) => {
  // console.log("data", firstname, lastname, username, email, password);
  const data = await fetch(`${url}/api/signup`, {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, username, email, password }),
  }).then((res) => res.json());

  console.assert(data.error == null, data.error);
  console.assert(data.message == null, data.message);
  /*
   *  return an array with data as
   *  first item if data and null as second
   */
  if (data.message !== null) return [data.message, null];
  return [null, data.error];
};

export const logout = () => {};
