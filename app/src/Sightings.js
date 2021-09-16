import * as React from "react";

import * as apiClient from "./apiClient";

//this is my Sightings component
const Sightings = () => {
  const [sightings, setSightings] = React.useState([]);

  const loadSightings = async () =>
    setSightings(await apiClient.getSightings());

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
          Spoted on: {sighting.sighting_date} @ {sighting.sighting_time}
        </li>
      ))}
    </ul>
  </div>
);

//this is my AddSighting component
const AddSighting = ({ addSighting }) => {
  const initialState = {
    individual_id: "",
    sighting_date: "",
    sighting_time: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "editIndividual_id":
        return { ...state, individual_id: action.payload };
      case "editSighting_date":
        return { ...state, sighting_date: action.payload };
      case "editSighting_time":
        return { ...state, sighting_time: action.payload };
      case "reset":
        return {
          ...state,
          individual_id: 0,
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addSighting(state);
    }
  };
  console.log(JSON.stringify(state));

  return (
    <form onSubmit={onSubmit}>
      <label>
        Individual ID:
        <input
          onChange={(e) =>
            dispatch({
              type: "editIndividual_id",
              payload: e.target.value,
            })
          }
          value={state.individual_id}
        />
      </label>
      <label>
        Sighting Date:
        <input
          type="date"
          onChange={(e) =>
            dispatch({
              type: "editSighting_date",
              payload: e.target.value,
            })
          }
          value={state.sighting_date}
        />
      </label>
      <label>
        Sighting Time:
        <input
          type="time"
          onChange={(e) =>
            dispatch({
              type: "editSighting_time",
              payload: e.target.value,
            })
          }
          value={state.sighting_time}
        />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Sightings;
