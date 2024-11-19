const axios = require("axios");
const Cookies = require("js-cookie");

// Generisanje device token-a
const generateDeviceToken = () => {
  return "device_" + Math.random().toString(12) + Date.now();
};

// Dohvatanje device token-a iz kolačića
const getDeviceToken = () => {
  let device_token = Cookies.get("device_token");
  if (!device_token) {
    device_token = generateDeviceToken();
    Cookies.set("device_token", device_token, { expires: 365 });
  }
  return device_token;
};

// Dohvatanje customer token-a iz kolačića
const getCustomerToken = () => {
  let customer_token = Cookies.get("customer_token");
  if (!customer_token) {
    customer_token = getDeviceToken();
    Cookies.set("customer_token", customer_token, { expires: 365 });
  }

  return customer_token;
};

// Glavna funkcija za slanje zahteva
const makeRequest = async (method, path, payload, token) => {
  const device_token = getDeviceToken();
  const customer_token = getCustomerToken();

  try {
    const response = await axios({
      method: method,
      url: "https://api.staging.croonus.com/api/v1/b2c/" + path.replace(/^\//, ""),
      headers: {
        "device-token": device_token,
        "customer-token": token ?? customer_token,
      },
      data: payload,
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error(`Error during API call to ${path}:`, error?.response?.data || error.message);
    return error?.response?.data;
  }
};

// Eksplicitno izvođenje metoda za korišćenje
module.exports = {
  get: async (path, customer_token = null) => {
    return makeRequest("GET", path, null, customer_token);
  },
  put: async (path, payload) => {
    return makeRequest("PUT", path, payload);
  },
  post: async (path, payload) => {
    return makeRequest("POST", path, payload);
  },
  list: async (path, payload, id) => {
    return makeRequest("LIST", path, { ...payload, id });
  },
  deleteMethod: async (path) => {
    return makeRequest("DELETE", path);
  },
  fetch: async (path, payload) => {
    return makeRequest("FETCH", path, payload);
  },
};
