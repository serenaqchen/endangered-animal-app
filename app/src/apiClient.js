export const getSightings = () => _get("/api/sightings");

export const addSighting = (newSighting) =>
  _post("/api/sightings", { newSighting });

//this gets data from url and turns into json object
const _get = async (url) => (await fetch(url)).json();

//this is going to post data to a certian api endpoint
const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
