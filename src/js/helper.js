import { TIMEOUT_SECS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, recipeData = undefined) {
  try {
    const fetchReq = recipeData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        })
      : fetch(url);

    const res = await Promise.race([fetchReq, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data?.message} (${res?.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data?.message} (${res?.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (url, recipeData) {
  try {
    const fetchReq = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const res = await Promise.race([fetchReq, timeout(TIMEOUT_SECS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data?.message} (${res?.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

*/
