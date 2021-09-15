export const getSightings = () => _get("/api/sightings");

// export const addSighting = (newSighting) => _post("/api/sightings", { newSighting });

const _get = async (url) => (await fetch(url)).json();

// const _post = async (url, body) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   let result;
//   try {
//     result = await response.json();
//   } catch {}

//   return result;
// };
