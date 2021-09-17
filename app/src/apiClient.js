export const formatDateandTime = (data) => {
  for (let obj of data) {
    //formatting my date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dt = new Date(obj.sighting_date);
    let fullDate = dt.toLocaleDateString("en-US", options);
    //updating how I want my date to be formatted
    obj.sighting_date = fullDate;

    //making time obj from data base to be a string
    let timeStr = String(obj.sighting_time);
    //if the hour is greater than 12, format time to HH:MM PM
    if (parseInt(timeStr.slice(0, 2)) > 12) {
      const formatedTime = `${
        parseInt(timeStr.slice(0, 2)) - 12
      }${timeStr.slice(2, 5)} PM`;
      obj.sighting_time = formatedTime;
      //if the hour is 12, format time to 12:00 PM
    } else if (parseInt(timeStr.slice(0, 2)) === 12) {
      obj.sighting_time = "12:00 PM";
      //if none of the above format to HH:MM AM
    } else {
      obj.sighting_time = `${timeStr.slice(0, 5)} AM`;
    }
  }
  return data;
};

export const getSightings = () => _get("/api/sightings");

export const getSpecies = () => _get("/api/species");

export const addSighting = (newSighting) =>
  _post("/api/sightings", newSighting);

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
