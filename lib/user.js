import "isomorphic-fetch";
import { url } from "lib/config";

// login user api call
export const login = async ({ username, password }) => {
  const data = await fetch(`${url}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

  console.assert(data.error == null, data.error);
  console.assert(data.message == null, data.message);

  return data;
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
  return data;
};

export const logout = () => {};
