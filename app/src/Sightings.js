import * as React from "react";

import * as apiClient from "./apiClient";

//this is my Sightings component
const Sightings = () => {
  const [sightings, setSightings] = React.useState([]);

  const loadSightings = async () =>
    setSightings(
      await apiClient.getSightings().then((data) => {
        return apiClient.formatDateandTime(data);
      }),
    );

  const addSighting = (newSighting) => {
    apiClient.addSighting(newSighting).then(loadSightings);
  };

  React.useEffect(() => {
    loadSightings();
  }, []);

  return (
    <section>
      <SightingList sightings={sightings} />
      <AddSighting addSighting={addSighting} />
    </section>
  );
};

//this is my SightingList component
const SightingList = ({ sightings }) => (
  <div>
    <h2>Sightings</h2>
    <ul>
      {sightings.map((sighting, index) => (
        <li key={index}>
          {sighting.nick_name} the {sighting.common_name} (
          {sighting.scientific_name}) <br />
          Spoted on: {sighting.sighting_date} @ {sighting.sighting_time} <br />
          Loction: {sighting.location} <br />
          Healthy: {sighting.healthy}
        </li>
      ))}
    </ul>
  </div>
);

//this is my AddSighting component
const AddSighting = ({ addSighting }) => {
  const initialState = {
    individual_id: "",
    healthy: "",
    location: "",
    sighting_date: "",
    sighting_time: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "editIndividual_id":
        return { ...state, individual_id: action.payload };
      case "editHealthy":
        return { ...state, healthy: action.payload };
      case "editLocation":
        return { ...state, location: action.payload };
      case "editSighting_date":
        return { ...state, sighting_date: action.payload };
      case "editSighting_time":
        return { ...state, sighting_time: action.payload };
      case "reset":
        return {
          ...state,
          individual_id: "",
          healthy: "",
          location: "",
          sighting_date: "",
          sighting_time: "",
        };
      default:
        return state;
    }
  }

  // const [sightingCommonName, setSightingCommonName] = React.useState("");
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const canAdd =
    state.individual_id !== "" &&
    state.sighting_date !== "" &&
    state.sighting_time !== "";

  const handleAddSighting = (e) => {
    e.preventDefault();
    if (canAdd) {
      addSighting(state);
    }
    dispatch({ type: "reset" });
  };
  // console.log(JSON.stringify(state));

  return (
    <div>
      <h2>Report New Sightings</h2>
      <form onSubmit={handleAddSighting}>
        <label htmlFor="individual_id">Individual ID: </label>
        <input
          id="individual_id"
          onChange={(e) =>
            dispatch({
              type: "editIndividual_id",
              payload: e.target.value,
            })
          }
          value={state.individual_id}
        />
        <br />
        <br />
        <label htmlFor="healthy">Healthy: </label>
        <select
          id="healthy"
          value={state.healthy}
          onChange={(e) =>
            dispatch({ type: "editHealthy", payload: e.target.value })
          }
        >
          <option value="">Please choose an option</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
        <br />
        <br />
        <label htmlFor="location">Location: </label>
        <input
          id="location"
          type="text"
          onChange={(e) =>
            dispatch({
              type: "editLocation",
              payload: e.target.value,
            })
          }
          value={state.location}
        />
        <br />
        <br />
        <label htmlFor="sighting_date">Sighting Date: </label>
        <input
          id="sighting_date"
          type="date"
          onChange={(e) =>
            dispatch({
              type: "editSighting_date",
              payload: e.target.value,
            })
          }
          value={state.sighting_date}
        />
        <br />
        <br />
        <label htmlFor="sighting_time">Sighting Time:</label>
        <input
          id="sighting_time"
          type="time"
          onChange={(e) =>
            dispatch({
              type: "editSighting_time",
              payload: e.target.value,
            })
          }
          value={state.sighting_time}
        />
        <br /> <br />
        <button disabled={!canAdd}>Add</button>
      </form>
    </div>
  );
};

export default Sightings;
